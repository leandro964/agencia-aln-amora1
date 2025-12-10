export const surveySteps = [
    {
        id: 1,
        headerValue: "R$ 100,00",
        progress: 20,
        question: "Como você avalia sua experiência geral aqui no aplicativo?",
        type: "checkbox",
        logoSrc: "./images/logo.png",
        options: [
            { id: "excelente", emoji: "🤩", label: "Excelente", value: "excelente" },
            { id: "boa", emoji: "🙂", label: "Boa", value: "boa" },
            { id: "regular", emoji: "😐", label: "Regular", value: "regular" },
            { id: "ruim", emoji: "😞", label: "Ruim", value: "ruim" }
        ],
        reward: 60.50
    },
    {
        id: 2,
        headerValue: "R$ 160,50",
        progress: 20,
        question: "Qual é o seu formato de vídeo favorito aqui no aplicativo?",
        type: "checkbox",
        logoSrc: "./images/logo.png",
        options: [
            { id: "video-curto", emoji: "🎥", label: "Vídeo curto", value: "video-curto" },
            { id: "video-medio", emoji: "📹", label: "Vídeo médio", value: "video-medio" },
            { id: "video-longo", emoji: "⏳", label: "Vídeo longo", value: "video-longo" },
            { id: "live", emoji: "📺", label: "Live", value: "live" }
        ],
        reward: 34.00
    },
    {
        id: 3,
        headerValue: "R$ 194,50",
        progress: 30,
        question: "Como você descobre novos vídeos aqui no aplicativo?",
        type: "checkbox",
        logoSrc: "./images/logo.png",
        options: [
            { id: "feed-para-voce", emoji: "🎯", label: "Feed “Para você”", value: "feed-para-voce" },
            { id: "seguindo-criadores", emoji: "👤", label: "Seguindo criadores", value: "seguindo-criadores" },
            { id: "hashtags", emoji: "🔍", label: "Através de hashtags", value: "hashtags" },
            { id: "feed-seguindo", emoji: "📜", label: "Feed “Seguindo”", value: "feed-seguindo" },
            { id: "recomendacoes", emoji: "💡", label: "Recomendações", value: "recomendacoes" }
        ],
        reward: 52.30
    },
    {
        id: 4,
        headerValue: "R$ 246,80",
        progress: 40,
        question: "Quantas horas por dia você passa aqui no aplicativo?",
        type: "radio",
        logoSrc: "./images/logo.png",
        options: [
            { id: "menos-1-hora", emoji: "🕐", label: "Menos de 1 hora", value: "menos-1-hora" },
            { id: "1-2-horas", emoji: "🕑", label: "1 a 2 horas", value: "1-2-horas" },
            { id: "2-4-horas", emoji: "🕓", label: "2 a 4 horas", value: "2-4-horas" },
            { id: "4-6-horas", emoji: "🕕", label: "4 a 6 horas", value: "4-6-horas" },
            { id: "mais-6-horas", emoji: "🕗", label: "Mais de 6 horas", value: "mais-6-horas" }
        ],
        reward: 60.50
    },
    {
        id: 5,
        headerValue: "R$ 307,30",
        progress: 50,
        question: "O que te faz seguir um criador aqui no aplicativo?",
        type: "checkbox",
        logoSrc: "./images/logo.png",
        options: [
            { id: "conteudo-divertido", emoji: "🎉", label: "Conteúdo divertido", value: "conteudo-divertido" },
            { id: "conteudo-educativo", emoji: "📚", label: "Conteúdo educativo", value: "conteudo-educativo" },
            { id: "conexao-pessoal", emoji: "🤝", label: "Conexão pessoal", value: "conexao-pessoal" },
            { id: "participacao-desafios", emoji: "🔥", label: "Participação em desafios", value: "participacao-desafios" },
            { id: "frequencia-postagens", emoji: "📅", label: "Frequência de postagens", value: "frequencia-postagens" }
        ],
        reward: 70.40
    },
    {
        id: 6,
        headerValue: "R$ 377,70",
        progress: 60,
        question: "Qual desses temas de conteúdo você mais gosta de assistir aqui no aplicativo?",
        type: "checkbox",
        logoSrc: "./images/logo.png",
        options: [
            { id: "comedy", emoji: "😂", label: "Comédia", value: "comedy" },
            { id: "dance", emoji: "💃", label: "Dança", value: "dance" },
            { id: "tutorials", emoji: "🛠️", label: "Tutoriais e dicas", value: "tutorials" },
            { id: "daily-vlogs", emoji: "📹", label: "Vlogs diários", value: "daily-vlogs" },
            { id: "fashion-beauty", emoji: "💄", label: "Moda e beleza", value: "fashion-beauty" }
        ],
        reward: 74.80
    },
    {
        id: 7,
        headerValue: "R$ 452,50",
        progress: 70,
        question: "Qual horário do dia você mais usa o aplicativo?",
        type: "checkbox",
        logoSrc: "./images/logo.png",
        options: [
            { id: "morning", emoji: "🌅", label: "Manhã", value: "morning" },
            { id: "afternoon", emoji: "🌞", label: "Tarde", value: "afternoon" },
            { id: "night", emoji: "🌜", label: "Noite", value: "night" },
            { id: "dawn", emoji: "🌙", label: "Madrugada", value: "dawn" }
        ],
        reward: 93.00
    },
    {
        id: 8,
        headerValue: "R$ 545,50",
        progress: 80,
        question: "Qual sessão do nosso aplicativo você mais acessa?",
        type: "checkbox",
        logoSrc: "./images/logo.png",
        options: [
            { id: "for-you", emoji: "🎯", label: "Para Você", value: "for-you" },
            { id: "following", emoji: "👥", label: "Seguindo", value: "following" },
            { id: "tiktok-live", emoji: "📺", label: "Live", value: "tiktok-live" },
            { id: "discover", emoji: "🔍", label: "Descobrir", value: "discover" },
            { id: "other", emoji: "➕", label: "Outro", value: "other" }
        ],
        reward: 60.50
    },
    {
        id: 9,
        headerValue: "R$ 606,00",
        progress: 90,
        question: "Com que frequência você comenta em vídeos aqui no aplicativo?",
        type: "radio",
        logoSrc: "./images/logo.png",
        options: [
            { id: "always", emoji: "🔄", label: "Sempre", value: "always" },
            { id: "frequently", emoji: "📆", label: "Frequentemente", value: "frequently" },
            { id: "sometimes", emoji: "⏳", label: "Às vezes", value: "sometimes" },
            { id: "rarely", emoji: "🌧️", label: "Raramente", value: "rarely" },
            { id: "never", emoji: "🚫", label: "Nunca", value: "never" }
        ],
        reward: 83.60
    },
    {
        id: 10,
        headerValue: "R$ 689,60",
        progress: 99,
        question: "Que tipo de interação você mais faz nos vídeos aqui no aplicativo?",
        type: "checkbox",
        logoSrc: "./images/logo.png",
        options: [
            { id: "like", emoji: "👍", label: "Curtir", value: "like" },
            { id: "comment", emoji: "💬", label: "Comentar", value: "comment" },
            { id: "share", emoji: "🔄", label: "Compartilhar", value: "share" },
            { id: "save", emoji: "📌", label: "Salvar", value: "save" },
            { id: "none", emoji: "🚫", label: "Nenhuma", value: "none" }
        ],
        reward: 130.40
    },
    {
        id: 11,
        headerValue: "R$ 820,00",
        progress: 99,
        question: "Qual é a sua faixa etária?",
        type: "radio",
        logoSrc: "./images/logo.png",
        options: [
            { id: "age-1", emoji: "🧑‍🎓", label: "13-17 anos", value: "13-17" },
            { id: "age-2", emoji: "🎉", label: "18-24 anos", value: "18-24" },
            { id: "age-3", emoji: "👩‍💼", label: "25-34 anos", value: "25-34" },
            { id: "age-4", emoji: "👵", label: "35 anos ou mais", value: "35+" }
        ],
        reward: 94.06,
        isFinal: true
    }
];

export const withdrawalData = {
    finalBalance: 914.06,
    lastRewards: "R$ 48,75"
};
