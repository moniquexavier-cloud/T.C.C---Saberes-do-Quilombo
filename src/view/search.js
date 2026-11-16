function normalizeText(text) {
    return String(text)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR");
}

async function renderSearchResults() {
    const resultsContainer = document.getElementById("search-results");
    if (!resultsContainer) return;

    const query = new URLSearchParams(window.location.search).get("q")?.trim() || "";
    const message = document.getElementById("search-message");

    if (!query) {
        message.textContent = "Digite um termo para pesquisar no site.";
        return;
    }

    try {
        const cards = await window.api("/quilombos/cards");
        const terms = normalizeText(query).split(/\s+/).filter(Boolean);
        const results = cards.filter((quilombo) => {
            const searchableText = normalizeText(`${quilombo.nome} ${quilombo.descricao}`);
            return terms.every((term) => searchableText.includes(term));
        });

        message.textContent = results.length
            ? `${results.length} resultado(s) para “${query}”.`
            : `Nenhum resultado encontrado para “${query}”.`;
        resultsContainer.replaceChildren();

        for (const quilombo of results) {
            const link = document.createElement("a");
            const card = document.createElement("div");
            const image = document.createElement("img");
            const title = document.createElement("strong");
            const description = document.createElement("p");
            const arrow = document.createElement("img");

            link.className = "card-link";
            link.href = `conteudo1.html?nome=${encodeURIComponent(quilombo.nome)}`;
            card.className = "card";

            image.src = window.resolverUrl(quilombo.foto);
            image.alt = quilombo.nome;
            image.className = "card-image";

            title.textContent = quilombo.nome;
            description.textContent = quilombo.descricao;

            arrow.src = window.resolverUrl("../../images/Arrow right-circle.png");
            arrow.alt = "";
            arrow.className = "acessar";

            card.append(image, title, description, arrow);
            link.append(card);
            resultsContainer.append(link);
        }
    } catch (error) {
        message.textContent = error.message;
    }
}

renderSearchResults();
