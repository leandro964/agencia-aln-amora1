//***** JavaScript for fetching filters and cards from Supabase *****//
//***** JavaScript para buscar filtros e cartões do Supabase *****//

jQuery(document).ready(function($){

    //***** Attributes for filters *****//
    //***** Atributos para filtros *****//

    //***** Filter configuration for custom controls (dynamically loaded) *****//
    //***** Configuração de filtro para controles personalizados (carregados dinamicamente) *****//
    let filterFields = [];

    function fetchFilterFieldsFromSupabase(callback) {

        //***** Check if CCSupabase is available *****//
        //***** Verifique se CCSupabase está disponível *****//

        if (!window.CCSupabase || !CCSupabase.supabaseKey) {

            if (typeof callback === 'function') callback();

            return;

        }
        
        const filtersDb = CCSupabase.supabaseFilters || 'card_filters';

        const url = `${CCSupabase.supabaseUrl}/rest/v1/${filtersDb}?select=*&order=id.asc`;
        
        $.ajax({
            url: url,
            method: 'GET',
            headers: {
                'apikey': CCSupabase.supabaseKey,
                'Authorization': 'Bearer ' + CCSupabase.supabaseKey,
                'Content-Type': 'application/json',
            },
            success: function(data) {

                if(Array.isArray(data) && data.length > 0) {

                    //***** All filter fields except id *****//
                    //***** Todos os campos de filtro, exceto id *****//
                    filterFields = [];

                    if (data[0] && typeof data[0] === 'object') {

                        for (const key in data[0]) {

                            let f = data[0][key];

                            if (typeof f === 'string') {

                                try {

                                    f = JSON.parse(f.replace(/'/g, '"'));

                                } catch (e) {

                                    continue;

                                }

                            }

                            if (f && typeof f === 'object' && f.name) {

                                filterFields.push(f);

                            }

                        }

                    }

                }

                if (typeof callback === 'function') callback();

            },
            error: function(xhr, status, error) {

                //***** fallback to previous static filters if needed *****//
                //***** retorna para filtros estáticos anteriores, se necessário *****//

                if (typeof callback === 'function') callback();

            }

        });

    }

    //***** Render Filters *****//
    //***** Renderiza os Filtro *****//

    function renderFilters() {

        //***** Check if we have the main filter container (from credit_cards_supabase shortcode) *****//
        //***** Verifique se temos o contêiner de filtro principal (do shortcode credit_cards_supabase) *****//

        const mainFilterContainer = document.querySelector('#cc-supabase-filters');
        
        if (mainFilterContainer && filterFields.length > 0) {

            //***** Create header with icon, title and card counter *****//
            //***** Crie cabeçalho com ícone, título e contador de cartas *****//

            let headerHtml = '<div class="cc-filters-header">';

            headerHtml += '<div class="cc-filters-title-row">';

            headerHtml += '<img src="' + CCSupabase.pluginUrl + 'filter.svg" alt="Filtros" class="cc-filters-icon">';

            headerHtml += '<h3 class="cc-filters-title">Encontre o cartão ideal para você:</h3>';

            headerHtml += '</div>';

            headerHtml += '<div class="cc-filters-counter" id="cc-filters-counter">Carregando...</div>';

            headerHtml += '</div>';
            
            //***** Create a form with all filters for the main shortcode *****//
            //***** Crie um formulário com todos os filtros para o shortcode principal *****//

            let formHtml = headerHtml + '<form id="cc-supabase-filter-form">';
            
            filterFields.forEach(f => {

                let fieldHtml = `<div class="filter-group">`;

                fieldHtml += `<label class="superLabel">${f.label}</label>`;
                
                if(f.type === 'text') {

                    fieldHtml += `<input type="${f.type}" name="${f.name}" class="inputText"/>`;

                } else if (f.type === 'checkbox') {

                   fieldHtml += `<div class="dropdown cc-checkbox-dropdown">`; // main dropdown container

                    fieldHtml += `<div class="dropdown-selected">${f.label}</div>`; // clickable label (you can enhance to show selected also)

                    fieldHtml += `<div class="dropdown-options">`; // options list (toggle visibility with JS/CSS)

                    fieldHtml += f.options.map(opt =>
                                `<div class="dropdown-option"><span>
                                <input type="checkbox" name="${f.name}[]" value="${opt.value}" id="${f.name}_${opt.value}">
                                <label for="${f.name}_${opt.value}">${opt.label}</label>
                                </span></div>`
                            ).join('');
                    
                    fieldHtml += `</div></div>`;

                } else if (f.type === 'range') {

                    //***** Special handling for income (renda) field with currency formatting *****//
                    //***** Tratamento especial para campo de renda (renda) com formatação de moeda *****//

                    if (f.name === 'incoming') {

                        fieldHtml += `<div class="cc-range-container">

                            <div class="cc-range-display">

                                <span>R$ 0,00</span>

                                <span id="${f.name}_display">R$ ${parseFloat(f.min || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>

                            <input type="${f.type}" name="${f.name}" min="${f.min}" max="${f.max}" step="100" value="${f.min}" 
                                   oninput="document.getElementById('${f.name}_display').innerText = 'R$ ' + parseFloat(this.value).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})" 
                                   class="cc-range-input">

                            <div class="cc-range-minmax">

                                <span>Mín: R$ ${parseFloat(f.min || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>

                                <span>Máx: R$ ${parseFloat(f.max || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>

                            </div>

                    </div>`;

                } else {

                    fieldHtml += `<div class="cc-range-simple"><input type="${f.type}" name="${f.name}" min="${f.min}" max="${f.max}" step="100" value="${f.min}" oninput="this.nextElementSibling.innerText=this.value" class="cc-range-input"> <span>${f.min}</span></div>`;

                }

            }

            fieldHtml += '</div>';

            formHtml += fieldHtml;

        });
            
            formHtml += '</form>';

            $(mainFilterContainer).html(formHtml);

        }

    }

    //***** Function to update card counter in filters header *****//
    //***** Função para atualizar contador de cartões no cabeçalho dos filtros *****//

    function updateCardCounter() {

        const counterEl = document.getElementById('cc-filters-counter');

        if (!counterEl) return;
        
        //***** Get total count without filters *****//
        //***** Obtem a contagem total sem filtros *****//

        const url = `${CCSupabase.supabaseUrl}/rest/v1/${CCSupabase.supabaseDatabase}?select=count`;

        $.ajax({
            url: url,
            method: 'HEAD',
            headers: {
                'apikey': CCSupabase.supabaseKey,
                'Authorization': 'Bearer ' + CCSupabase.supabaseKey,
                'Prefer': 'count=exact'
            },
            success: function(data, textStatus, jqXHR) {

                const total = parseInt(jqXHR.getResponseHeader('content-range')?.split('/')?.[1] || '0', 10);

                const pluralSuffix = total === 1 ? '' : 's';

                counterEl.innerHTML = `${total} cartão${pluralSuffix} encontrado${pluralSuffix}`;

            },
            error: function() {

                counterEl.innerHTML = 'Total não disponível';

            }

        });

    }

    //***** Pagination state *****//
    //***** Estado da Paginação *****//

    let currentPage = 1;

    let lastFilters = {};

    const PAGE_SIZE = 10;
    
    function fetchCards(filters = {}, page = 1) {

        currentPage = page;

        lastFilters = { ...filters };

        let query = '';

        const numericFields = ['incoming'];

        const eqFields = ['flag', 'cover', 'category', 'institution', 'is_negative', 'is_recommended', 'annuity'];

        const checkboxsFields = ['benefits'];

        Object.entries(filters).forEach(([k, v]) => {

            if (!v) return;

            if (numericFields.includes(k)) {

                if (parseInt(v, 10) > 0) {

                    query += (query ? '&' : '?') + `${k}=gte.${parseInt(v, 10)}`;

                }

            } else if (eqFields.includes(k)) {

                if (Array.isArray(v) && v.length > 0) {

                    query += (query ? '&' : '?') + `${k}=in.(${v.map(encodeURIComponent).join(',')})`;

                } else if (v) {

                    query += (query ? '&' : '?') + `${k}=eq.${encodeURIComponent(v)}`;

                }

            }else if(checkboxsFields.includes(k)){

                var filter = '[';

                if(v.length > 1){

                    v.forEach(q =>{

                        filter += `{ "value": "${q}" },`;

                    })

                    filter = filter.slice(0,-1);

                    filter += "]";
                    
                }else{
                    
                    filter = `[{ "value": "${v[0]}" }]`;

                }

                query += (query ? '&' : '?') + `${k}=cs.${encodeURIComponent(filter)}`;


            } else {

                query += (query ? '&' : '?') + `${k}=ilike.*${encodeURIComponent(v)}*`;

            }

        });
        
        //***** Pagination via Range header and query params *****//
        //***** Paginação via cabeçalho Range e parâmetros de consulta *****//

        const from = (page - 1) * PAGE_SIZE;

        const to = from + PAGE_SIZE - 1;

        let sep = query ? '&' : '?';

        query += sep + `select=*&order=title.asc`;

        const url = `${CCSupabase.supabaseUrl}/rest/v1/${CCSupabase.supabaseDatabase}${query}`;

        $.ajax({
            url,
            method: 'GET',
            headers: {
                'apikey': CCSupabase.supabaseKey,
                'Authorization': 'Bearer ' + CCSupabase.supabaseKey,
                'Range-Unit': 'items',
                'Range': `${from}-${to}`
            },

            success: function(cards, textStatus, jqXHR) {

                const total = parseInt(jqXHR.getResponseHeader('content-range')?.split('/')?.[1] || '0', 10);

                renderCards(cards, total);

            },

            error: function(xhr, stat, err) {

                $('#cc-supabase-results').html('<p class="cc-error-message">Falha ao Carregar os Cartões</p>');

                $('#cc-supabase-pagination').remove();

            }

        });

    }

    //**** Render cards as HTML *****//
    //***** Renderiza o Cartão como HTML *****//

    function renderCards(cards, total = 0) {

        if (!cards || !cards.length) {

            $('#cc-supabase-results').html('<p class="cc-no-results">Nenhum Cartão Não Encontrado Com Os Requisitos Solicitados</p>');

            $('#cc-supabase-pagination').remove();

            return;

        }
        
        //***** Create cards grid - the CSS classes will determine the layout (2 or 4 columns) *****//
        //***** Crie uma grade de cartões - as classes CSS determinarão o layout (2 ou 4 colunas) *****//
        let html = '<div class="cc-cards-grid">';
        
        cards.forEach(card => {

            const imgUrl = `${CCSupabase.supabaseUrl}/storage/v1/object/public/${CCSupabase.storageBucket}/${card.card_image}`;

            html += `<div class="cc-supabase-card" onclick="location = '${card.page_link}'">

                     <div class="cc-card-content">

                    <img src="${imgUrl}" alt="${card.title}" onerror="this.style.display='none'" />

                    <div class="cc-title">${card.title || ''}</div>

                    <div class="cc-row"><span>Anuidade:</span> <span>${card.annuity || ''}</span></div>

                    <div class="cc-row"><span>Tipo:</span> <span>${card.category || ''}</span></div>

                </div>

                <div class="cc-row btn">

                    <a href="#" class="btnA">Saiba mais sobre o cartão ></a>

                </div>

        </div>`;

    });
        
        html += '</div>';
        
        let paginationHtml = renderPagination(total);

        $('#cc-supabase-results').html(html + paginationHtml);

    }

    function renderPagination(total) {

        const PAGE_SIZE = 10;

        const pageCount = Math.ceil(total / PAGE_SIZE);

        if (pageCount < 2) return '';

        let html = '<div id="cc-supabase-pagination" class="cc-pagination-container">';

        for (let p = 1; p <= pageCount; p++) {

            html += `<button class="cc-supabase-page-btn${p === currentPage ? ' cc-page-current' : ''}" data-page="${p}">${p}</button>`;

        }

        html += '</div>';

        return html;

    }

    //***** Handle pagination click *****//
    //***** Lidar com clique de paginação *****//

    $(document).on('click', '.cc-supabase-page-btn', function(e){

        e.preventDefault();

        const page = parseInt($(this).data('page'), 10) || 1;

        fetchCards(lastFilters, page);

    });

    //***** Submit filter form on any input change *****//
    //***** Envie o formulário de filtro em qualquer alteração de entrada *****//

    $(document).on('change input', '#cc-supabase-filter-form input', function(){

        const form = $('#cc-supabase-filter-form');

        const filters = {};

        filterFields.forEach(f => {

            if(f.type === 'checkbox') {

               var checked = form.find(`[name="${f.name}[]"]:checked`).map(function(){ return this.value; }).get();

               filters[f.name] = checked.length > 0 ? checked : '';

           } else {

            filters[f.name] = form.find(`[name=${f.name}]`).val();

        }

    });

        fetchCards(filters, 1);

    });
    
    //***** Handle search form submission - prevent redirect and filter cards *****//
    //***** Lidar com o envio do formulário de pesquisa - evitar redirecionamentos e filtros de cartões *****//

    $(document).on('submit', '#cc-search-form', function(e) {

        e.preventDefault(); // Prevent form submission/redirect - Previne o formulário de ser submetido.
        
        const searchTerm = $('#cc-search-input').val().trim();
        
        //***** Create filters object including search term *****//
        //***** Criar objeto de filtros incluindo termo de pesquisa *****//

        const filters = {};
        
        //***** Add current filter values if they exist *****//
        //***** Adicione valores de filtro atuais, se existirem *****//
        const filterForm = $('#cc-supabase-filter-form');

        if (filterForm.length) {

            filterFields.forEach(f => {

                if (f.type === 'radio' || f.type === 'checkbox') {

                    var checked = filterForm.find(`[name="${f.name}[]"]:checked`).map(function(){ return this.value; }).get();

                    if (checked.length > 0) {

                        filters[f.name] = checked;

                    }

                } else {

                    var val = filterForm.find(`[name="${f.name}"]`).val();

                    if (val !== undefined && val !== '') {

                        filters[f.name] = val;

                    }

                }

            });

        }
        
        //***** Add search term as title filter *****//
        //***** Adicionar termo de pesquisa como filtro de título *****//

        if (searchTerm) {

            filters['title'] = searchTerm;

        }
        
        fetchCards(filters, 1); // Reset to first page on search - Redefine a primeira página na pesquisa.

    });
    
    //***** Handle search input changes (real-time search) *****//
    //***** Lidar com alterações de entrada de pesquisa (pesquisa em tempo real) *****//
    $(document).on('input', '#cc-search-input', function() {

        const searchTerm = $(this).val().trim();
        
        //***** Only search if user has typed at least 2 characters or cleared the field *****//
        //***** Pesquise apenas se o usuário digitou pelo menos 2 caracteres ou limpou o campo *****//
        if (searchTerm.length >= 2 || searchTerm.length === 0) {

            //***** Create filters object including search term *****//
            //***** Criar objeto de filtros incluindo termo de pesquisa *****//

            const filters = {};
            
            //***** Add current filter values if they exist *****//
            //***** Adicione valores de filtro atuais, se existirem *****//

            const filterForm = $('#cc-supabase-filter-form');

            if (filterForm.length) {

                filterFields.forEach(f => {

                    if (f.type === 'radio' || f.type === 'checkbox') {

                        var checked = filterForm.find(`[name="${f.name}[]"]:checked`).map(function(){ return this.value; }).get();

                        if (checked.length > 0) {

                            filters[f.name] = checked;

                        }

                    } else {

                        var val = filterForm.find(`[name="${f.name}"]`).val();

                        if (val !== undefined && val !== '') {

                            filters[f.name] = val;

                        }

                    }

                });

            }
            
            //***** Add search term as title filter *****//
            //***** Adicionar termo de pesquisa como filtro de título *****//

            if (searchTerm) {

                filters['title'] = searchTerm;

            }
            
            fetchCards(filters, 1); // Reset to first page on search - Redfini a primeira página na pequisa.

        }

    });
    
    //***** Handle category button clicks *****//
    //***** Lidar com cliques em botões de categoria *****//
    $(document).on('click', '.cc-category-btn', function(e) {

        e.preventDefault();
        
        //***** Remove active class from all buttons and add to clicked one *****//
        //***** Remova a classe ativa de todos os botões e adicione ao clicado *****//
        $('.cc-category-btn').removeClass('active');

        $(this).addClass('active');
        
        const filterType = $(this).data('filter');
        
        //***** Create filters object based on category *****//
        //***** Crie objetos de filtros com base na categoria *****//

        const filters = {};
        
        //***** Add current filter form values if they exist *****//
        //***** Adicione os valores atuais do formulário de filtro, se existirem *****//

        const filterForm = $('#cc-supabase-filter-form');

        if (filterForm.length) {

            filterFields.forEach(f => {

                if (f.type === 'radio' || f.type === 'checkbox') {

                    var checked = filterForm.find(`[name="${f.name}[]"]:checked`).map(function(){ return this.value; }).get();

                    if (checked.length > 0) {

                        filters[f.name] = checked;

                    }

                } else {

                    var val = filterForm.find(`[name="${f.name}"]`).val();

                    if (val !== undefined && val !== '') {

                        filters[f.name] = val;

                    }

                }

            });

        }
        
        //***** Add search term if it exists *****//
        //***** Adicione o termo de pesquisa, se existir *****//

        const searchTerm = $('#cc-search-input').val().trim();

        if (searchTerm) {

            filters['title'] = searchTerm;

        }
        
        //***** Apply category-specific filters *****//
        //***** Aplicar filtros específicos de categoria *****//
        switch(filterType) {

        case 'recommended':

            filters['is_recommended'] = 'true';

            break;

        case 'negative':

            filters['is_negative'] = 'true';

            break;

        case 'cashback':

            filters['benefits'] = "Cashback";

            break;

        case 'miles':

            filters['benefits'] = "Milhas"

            break;

        case 'no-annuity':

            filters['annuity'] = 'Sem anuidade';

            break;

        case 'low-income':

            filters['incoming'] = '2000';

            break;

        }
        
        fetchCards(filters, 1); // Reset to first page on category filter - Redefinir para a primeira página no filtro de categoria

    });

    $(document).on('click', 'a.btnA', function(e) {

    e.preventDefault(); // prevents the page from loading - impede o carregamento da página

    const urlParams = new URLSearchParams(window.location.search);

    const cardId = urlParams.get('credit_card_id');

    if (cardId) {

        //***** Load the card via AJAX *****//
        //***** Carregar o cartão pelo AJAX *****//
        $.ajax({
            url: CCSupabase.ajaxurl,
            data: { action: "cc_supabase_single", id: cardId },
            method: 'GET',
            success: function(res) {

                if (!res.success || !res.data) {

                    $("#cc-supabase-single").html('<p>Cartão não encontrado.</p>');

                    return;

                }

                const card = res.data;

                const imgUrl = `${CCSupabase.supabaseUrl}/storage/v1/object/public/${CCSupabase.storageBucket}/${card.card_image}`;

                let html = `<div class="cc-supabase-single-card" onclick="location = '${card.page_link}'">

                    <img src="${imgUrl}" alt="${card.title}" class="cc-single-image"/>

                    <div class="cc-title">${card.title || ''}</div>

                    <div class="cc-single-content">${card.content || ''}</div>

                    <div><a href="${card.page_link}" class="btnA">Ir para oferta</a></div>

            </div>`;

            $("#cc-supabase-single").html(html);

        },
        error: function() {

            $("#cc-supabase-single").html('<p>Erro carregando cartão.</p>');

        }

    });
        
        //***** Update the URL without reloading the page *****//
        //***** Atualizar a URL sem recarregar a página *****//

        history.pushState(null, '', '?credit_card_id=' + cardId);

    }

});


    //***** Helper: fetch single card by id *****//
    //***** Auxiliar: buscar cartão único por id *****//

    async function fetchCardById(id){

        if(!id) return null;

        const url = `${CCSupabase.supabaseUrl}/rest/v1/${CCSupabase.supabaseDatabase}?id=eq.${encodeURIComponent(id)}&select=*`;

        try{

            const res = await $.ajax({
                url,
                method: 'GET',
                headers: {
                    'apikey': CCSupabase.supabaseKey,
                    'Authorization': 'Bearer ' + CCSupabase.supabaseKey,
                    'Content-Type': 'application/json',
                }

            });

            if(Array.isArray(res) && res.length){

                return res[0];

            }

        }catch(e){

            // ignore - ignora
        }

        return null;

    }

    function renderRecommend(card, container){

        if(!card) return;

        let imgUrl = '';

        if (card.card_image && card.card_image.trim() !== '') {

            imgUrl = `${CCSupabase.supabaseUrl}/storage/v1/object/public/${CCSupabase.storageBucket}/${card.card_image}`;

        }

        if (container && imgUrl) {

            const imgHost = container.querySelector('#cc-supabase-card-image');

            if (imgHost) imgHost.innerHTML = `<img src="${imgUrl}" alt="${card.title || ''}" class="cc-shortcode-image-small" onerror="this.style.display='none'"/>`;

        }

        let items = [];

        if (card.emphasys) {

            //***** accepts CSV or JSON array *****//
            //***** aceita matriz CSV ou JSON *****//

            items = card.emphasys;

        }

        const limited = items.slice(0, 3);

        const starIcon = '<svg width="16" height="16" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg" class="cc-recommendation-icon"><path d="M39.8956 14.4854C39.7677 14.089 39.526 13.739 39.2006 13.4791C38.8751 13.2191 38.4804 13.0607 38.0655 13.0236L26.5204 11.9752L21.9552 1.2898C21.6185 0.506731 20.8519 0 20.0002 0C19.1484 0 18.3818 0.506809 18.0452 1.29175L13.4799 11.9753L1.933 13.0236C1.51863 13.0616 1.1245 13.2203 0.7995 13.4801C0.474496 13.74 0.232902 14.0895 0.104672 14.4854C-0.158694 15.2954 0.0845153 16.1838 0.726328 16.7438L9.45311 24.3971L6.87976 35.7325C6.69147 36.566 7.01492 37.4276 7.7065 37.9274C8.07815 38.196 8.51308 38.3327 8.95161 38.3327C9.32974 38.3327 9.70475 38.2308 10.0415 38.0294L20.0002 32.0774L29.9552 38.0294C30.6837 38.4677 31.602 38.4276 32.292 37.9274C32.6298 37.6829 32.8883 37.3445 33.0353 36.9542C33.1823 36.564 33.2113 36.1391 33.1188 35.7325L30.5455 24.3971L39.2722 16.7453C39.5861 16.4712 39.8126 16.1108 39.9234 15.709C40.0343 15.3072 40.0246 14.8817 39.8956 14.4854Z" fill="#24B500"/></svg>';

        let html = '';

        if (limited.length > 0) {

            html = '<ul class="cc-recommendations-list">';

            limited.forEach(item => {

                let label = item.label;

                let content = item.content;

                html += '<li class="cc-recommendation-item">';

                html += '<span class="cc-recommendation-icon">' + starIcon + '</span>';

                html += '<div class="cc-recommendation-content">';

                html += '<span class="cc-recommendation-label' + (content ? ' has-content' : '') + '">' + label + '</span>';

                html += '<span class="cc-recommendation-description">' + content + '</span>';

                html += '</div>';

                html += '</li>';

            });

            html += '</ul>';

        } else {

            html = '<p class="cc-no-recommendations">Nenhuma recomendação disponível.</p>';

        }

        if (container) {

            const recomEl = container.querySelector('#cc-supabase-recom');

            if (recomEl) recomEl.innerHTML = html;

        }

    }

    function renderProCons(card, container){

        if(!card) return;

        const imgUrl = `${CCSupabase.supabaseUrl}/storage/v1/object/public/${CCSupabase.storageBucket}/${card.card_image || ''}`;

        if (container) {

            const imgHost = container.querySelector('#cc-supabase-card-image');

            if (imgHost) imgHost.innerHTML = `<img src="${imgUrl}" alt="${card.title || ''}" class="cc-shortcode-image-small" onerror="this.style.display='none'"/>`;

        }

        let pros = [], cons = [];

        if (card.pros) {

            try {

                if (typeof card.pros === 'string' && card.pros.trim().startsWith('[')) {

                    pros = JSON.parse(card.pros);

                } else if (typeof card.pros === 'string') {

                    pros = card.pros.split(',').map(s => s.trim()).filter(Boolean);

                }

            } catch(_) {}

        }

        if (card.cons) {

            try {

                if (typeof card.cons === 'string' && card.cons.trim().startsWith('[')) {

                    cons = JSON.parse(card.cons);

                } else if (typeof card.cons === 'string') {

                    cons = card.cons.split(',').map(s => s.trim()).filter(Boolean);

                }

            } catch(_) {}

        }

        //***** Fallback: use benefits as pros if no explicit pros/cons *****//
        //***** Retorno: use os benefícios como vantagens se não houver prós/contras explícitos *****//

        if (!pros.length && !cons.length && card.benefits) {

            pros = String(card.benefits).split(',').map(s => s.trim()).filter(Boolean);

        }

        const html = `<div class="cc-pros-cons-container">

                <div class="cc-pros-container">

                    <h3>Prós</h3>

        ${pros.length ? `<ul>${pros.map(i=>`<li>${i}</li>`).join('')}</ul>` : '<p>—</p>'}

                </div>

                <div class="cc-cons-container">

                    <h3>Contras</h3>

        ${cons.length ? `<ul>${cons.map(i=>`<li>${i}</li>`).join('')}</ul>` : '<p>—</p>'}

                </div>

    </div>`;

    if (container) {

        const pcEl = container.querySelector('#cc-supabase-p-c');

        if (pcEl) pcEl.innerHTML = html;

    }

}

function initShortcodeSectionsOnce(){

    const recEls = Array.from(document.querySelectorAll('div#cc-supabase-recommend'));

    const pcEls  = Array.from(document.querySelectorAll('div#cc-supabase-pro-cons'));

        //***** Render recommends *****//
        //***** Renderiza Recomendações *****//

    recEls.forEach(async (el) => {

        const id = el.getAttribute('data-card-id') || '';

        if (!id) { const m = el.querySelector('#cc-supabase-recom'); if (m) m.innerHTML = '\u003cp\u003eID do cartão não informado.\u003c/p\u003e'; return; }

        try {

            const card = await fetchCardById(id);

            if (card) renderRecommend(card, el); else { const m = el.querySelector('#cc-supabase-recom'); if (m) m.innerHTML = '\u003cp\u003eCartão não encontrado.\u003c/p\u003e'; }

        } catch (e) {

            const m = el.querySelector('#cc-supabase-recom'); if (m) m.innerHTML = '\u003cp\u003eErro ao carregar cartão.\u003c/p\u003e';

        }

    });

        //***** Render pros/cons *****//
        //***** Renderiza Prós/ Contras *****//

    pcEls.forEach(async (el) => {

        const id = el.getAttribute('data-card-id') || '';

        if (!id) { const m = el.querySelector('#cc-supabase-p-c'); if (m) m.innerHTML = '\u003cp\u003eID do cartão não informado.\u003c/p\u003e'; return; }

        try {

            const card = await fetchCardById(id);

            if (card) renderProCons(card, el); else { const m = el.querySelector('#cc-supabase-p-c'); if (m) m.innerHTML = '\u003cp\u003eCartão não encontrado.\u003c/p\u003e'; }

        } catch (e) {

            const m = el.querySelector('#cc-supabase-p-c'); if (m) m.innerHTML = '\u003cp\u003eErro ao carregar cartão.\u003c/p\u003e';

        }

    });

}

function initShortcodeSectionsWithRetry(){

    let tries = 0;

    const maxTries = 50;

    const iv = setInterval(() => {

        if (window.CCSupabase && CCSupabase.supabaseUrl) {

            clearInterval(iv);

            initShortcodeSectionsOnce();

        } else if (++tries > maxTries) {

            clearInterval(iv);

                //***** still attempt rendering; fetchCardById will fail gracefully *****//
                //***** ainda tente renderizar; fetchCardById falhará normalmente *****//

            initShortcodeSectionsOnce();

        }

    }, 100);

}

    //***** Initial: fetch filters from supabase, then render *****//
    //***** Inicialmente: busque filtros do supabase e depois renderize *****//

fetchFilterFieldsFromSupabase(function() {

    renderFilters();

    updateCardCounter();

    fetchCards();

    initShortcodeSectionsWithRetry();

});

    //***** Also kick off shortcode sections immediately (independent of filters) *****//
    //***** Também inicie seções de shortcode imediatamente (independente de filtros) *****//

initShortcodeSectionsWithRetry();

    //***** Check if we have a standalone cc-supabase-results container (without filters) *****//
    //***** Verifiqua se temos um contêiner cc-supabase-results independente (sem filtros) *****//
    //***** This handles the [cc_supabase_results] shortcode independently *****//
    //***** Isso lida com o shortcode [cc_supabase_results] de forma independente *****//
function checkStandaloneResults() {

    const resultsContainer = $('#cc-supabase-results');

    const filtersContainer = $('#cc-supabase-filters');

        //***** If we have results container but no filters container, load cards directly *****//
        //***** Se tivermos um contêiner de resultados, mas nenhum contêiner de filtros, carregue os cartões diretamente *****//

    if (resultsContainer.length && !filtersContainer.length) {

            fetchCards(); // Load all cards without filters

        }

    }
    
    //***** Check for standalone results container with retry for CCSupabase availability *****//
    //***** Verifique o contêiner de resultados autônomo com nova tentativa de disponibilidade do CCSupabase *****//
    function checkStandaloneWithRetry() {

        let tries = 0;

        const maxTries = 50;

        const iv = setInterval(() => {

            if (window.CCSupabase && CCSupabase.supabaseUrl) {

                clearInterval(iv);

                checkStandaloneResults();

            } else if (++tries > maxTries) {

                clearInterval(iv);

                checkStandaloneResults(); // Try anyway - Tenta mesmo assim.

            }

        }, 100);

    }
    
    //***** Run standalone check immediately and after a delay *****//
    //***** Execute a verificação autônoma imediatamente e após um atraso *****//

    checkStandaloneWithRetry();
    
    //***** Also run after DOM is fully loaded *****//
    //***** Execute também depois que o DOM estiver totalmente carregado *****//

    $(window).on('load', function() {

        setTimeout(checkStandaloneResults, 500);

    });
    
    //***** Independent card loading function for standalone shortcode ONLY *****//
    //***** Função de carregamento de cartão independente SOMENTE para shortcode independente *****//
    function loadStandaloneCards() {

        //***** Find ONLY standalone containers (not the filtered ones) *****//
        //***** Encontre SOMENTE contêineres independentes (não os filtrados) *****//
        const standaloneContainers = document.querySelectorAll('#cc-standalone-results');
        
        if (standaloneContainers.length === 0) {

            return;
        }
        
        if (!window.CCSupabase || !CCSupabase.supabaseUrl) {

            standaloneContainers.forEach(container => {

                container.innerHTML = '<p class="cc-error-message">Configuração não carregada.</p>';

            });

            return;

        }
        
        const url = `${CCSupabase.supabaseUrl}/rest/v1/${CCSupabase.supabaseDatabase}?select=*&order=title.asc&limit=4`;
        
        $.ajax({
            url: url,
            method: 'GET',
            headers: {
                'apikey': CCSupabase.supabaseKey,
                'Authorization': 'Bearer ' + CCSupabase.supabaseKey,
                'Content-Type': 'application/json',
            },
            success: function(cards) {

                if (!cards || !cards.length) {

                    standaloneContainers.forEach(container => {

                        container.innerHTML = '<p class="cc-no-results">Nenhum cartão encontrado.</p>';

                    });

                    return;

                }
                
                //***** Create cards grid for standalone layout (always 4 columns) *****//
                //***** Cria uma grade de cartões para layout independente (sempre 4 colunas) *****//

                let html = '<div class="cc-cards-grid">';

                cards.forEach(card => {

                    const imgUrl = `${CCSupabase.supabaseUrl}/storage/v1/object/public/${CCSupabase.storageBucket}/${card.card_image}`;

                    html += `<div class="cc-supabase-card">

                        <div class="cc-card-content">

                            <img src="${imgUrl}" alt="${card.title}" onerror="this.style.display='none'" />

                            <div class="cc-title">${card.title || ''}</div>

                            <div class="cc-row"><span>Anuidade:</span> <span>${card.annuity || ''}</span></div>

                            <div class="cc-row"><span>Tipo:</span> <span>${card.category || ''}</span></div>

                        </div>

                        <div class="cc-row btn">

                            <a href="${card.page_link}" class="btnA">Saiba mais sobre o cartão ></a>

                        </div>

                </div>`;

            });

                html += '</div>';

                
                //***** Populate all standalone containers *****//
                //***** Preencher todos os contêineres independentes *****//

                standaloneContainers.forEach((container, index) => {

                    container.innerHTML = html;

                });

            },

            error: function(xhr, status, error) {

                standaloneContainers.forEach(container => {

                    container.innerHTML = '<p class="cc-error-message">Erro ao carregar cartões.</p>';

                });

            }

        });

    }
    
    //***** Try standalone loading multiple times and ways *****//
    //***** Experimente o carregamento independente várias vezes e de várias maneiras *****//

    setTimeout(loadStandaloneCards, 100);

    setTimeout(loadStandaloneCards, 500);

    setTimeout(loadStandaloneCards, 1000);
    
});