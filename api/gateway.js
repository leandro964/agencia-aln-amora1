
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { acao, oferta, nome, email, telefone, cpf, utm, utm_source, utm_medium, utm_campaign, valor, payment_id } = req.query;

    // Key from config
    const gateway_api = "https://www.pagamentos-seguros.app/api-pix/aztQ_cL4cuykpNOmE88AiOhJxHH1qSBB0NOdDSFfabFBbd0vF-izl_q9lI-GaxDNesS_zKZICIfe7oFnbFjRVQ";

    if (!acao) {
        return res.status(400).json({ erro: 1, erroMsg: "Ação não especificada" });
    }

    if (acao === 'criar') {
        if (!oferta || !nome || !telefone || !cpf) {
            return res.status(400).json({ erro: 1, erroMsg: "Parâmetro(s) obrigatório(s) faltando" });
        }

        let ofertaNome = "Oferta Demo - NLO";
        let finalValor = parseInt(String(parseFloat(valor).toFixed(2)).replace('.', ''));

        if (oferta === 'configuravel') {
            ofertaNome = "Kwai Rewards";
        }

        // Logic to try and get a clean UTM string or prioritize utm_source if that's what's needed
        // If utm_source is present, we might want to construct a clean query string or just pass it.
        // The user asked for "utm_source limpa". If 'utm' is messy, we prefer individual params.

        let finalUtm = utm || "";
        if (utm_source) {
            // Reconstruct if individual params are available, to ensure cleanliness
            const params = new URLSearchParams();
            if (utm_source) params.set('utm_source', utm_source);
            if (utm_medium) params.set('utm_medium', utm_medium);
            if (utm_campaign) params.set('utm_campaign', utm_campaign);
            finalUtm = params.toString();
        } else if (finalUtm) {
            // Try to decode if looks double encoded (simple check)
            if (finalUtm.includes('%3D') || finalUtm.includes('%26')) {
                try {
                    finalUtm = decodeURIComponent(finalUtm);
                } catch (e) {
                    // ignore
                }
            }
        }

        const postfields = {
            utm: finalUtm,
            item: {
                price: finalValor,
                title: ofertaNome,
                quantity: 1
            },
            amount: finalValor,
            customer: {
                name: nome,
                email: email,
                phone: telefone,
                document: cpf
            },
            description: "Pagamento via Pix",
            paymentMethod: "PIX"
        };

        try {
            const response = await fetch(gateway_api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postfields)
            });

            const result = await response.json();

            if (result.message) {
                return res.status(200).json({
                    erro: 1,
                    erroMsg: result.message,
                    erroCode: result.code
                });
            }

            if (result.transactionId) {
                return res.status(200).json({
                    payment_id: result.transactionId,
                    pixCode: result.pixCode,
                    status: result.status
                });
            } else {
                return res.status(200).json({
                    erro: 1,
                    erroMsg: "API retornou id nulo",
                    detalhes: JSON.stringify(result)
                });
            }

        } catch (error) {
            return res.status(500).json({ erro: 1, erroMsg: error.message });
        }

    } else if (acao === 'verificar') {
        if (!payment_id) {
            return res.status(400).json({ erro: 1, erroMsg: "Parâmetro obrigatório faltando" });
        }

        try {
            const response = await fetch(`${gateway_api}?transactionId=${payment_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();

            if (!result.error) {
                return res.status(200).json({
                    status: result.status
                });
            } else {
                return res.status(200).json({
                    erro: 1,
                    erroMsg: "Erro: " + result.error,
                    detalhes: JSON.stringify(result)
                });
            }

        } catch (error) {
            return res.status(500).json({ erro: 1, erroMsg: error.message });
        }
    } else {
        return res.status(400).json({ erro: 1, erroMsg: "Ação não encontrada." });
    }
}
