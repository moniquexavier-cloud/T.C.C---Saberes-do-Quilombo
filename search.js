const quilomboCards = [
    {
        title: "Quilombo da Cordoaria",
        url: "conteudo1.html",
        image: "Images/casa_farinha_cordoaria.png",
        imageAlt: "Casa de farinha comunitária do Quilombo da Cordoaria",
        description: "O quilombo faz parte das comunidades remanescentes de quilombos do século 19, criados por escravizados libertos que receberam essas terras por doação ou como pagamento. As primeiras famílias que habitaram a região foram as famílias Reis e Santana, possíveis trabalhadores de canavieiras que receberam autorização dos antigos proprietários para usufruírem da terra. Com 260 anos de formação..."
    },
    {
        title: "Quilombo Quingoma",
        url: "conteudo2.html",
        image: "Images/local_quingoma.png",
        imageAlt: "Localidade do Quilombo Quingoma",
        description: "O Quilombo Quingoma é um dos territórios quilombolas mais antigos do Brasil, com registros de ocupação desde 1569. A história oral da comunidade conta que seus ancestrais foram capturados na costa leste da África e trazidos nos primeiros navios negreiros que chegaram à costa da Bahia..."
    }
];

function normalizeText(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR");
}

function renderSearchResults() {
    const resultsContainer = document.getElementById("search-results");
    if (!resultsContainer) return;

    const query = new URLSearchParams(window.location.search).get("q")?.trim() || "";
    const message = document.getElementById("search-message");

    if (!query) {
        message.textContent = "Digite um termo para pesquisar no site.";
        return;
    }

    const terms = normalizeText(query).split(/\s+/).filter(Boolean);
    const results = quilomboCards.filter((page) => {
        const searchableText = normalizeText(page.title);
        return terms.every((term) => searchableText.includes(term));
    });

    message.textContent = results.length
        ? `${results.length} resultado(s) para “${query}”.`
        : `Nenhum resultado encontrado para “${query}”.`;

    results.forEach((result) => {
        const link = document.createElement("a");
        link.className = "card-link";
        link.href = result.url;
        const card = document.createElement("div");
        card.className = "card";

        const image = document.createElement("img");
        image.src = result.image;
        image.alt = result.imageAlt;
        image.className = "card-image";

        const title = document.createElement("strong");
        title.textContent = result.title;
        const description = document.createElement("p");
        description.textContent = result.description;
        const arrow = document.createElement("img");
        arrow.src = "Images/Arrow right-circle.png";
        arrow.alt = "";
        arrow.className = "acessar";

        card.append(image, title, description, arrow);
        link.appendChild(card);
        resultsContainer.appendChild(link);
    });
}

renderSearchResults();
