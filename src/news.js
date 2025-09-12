let newsContent = [];
let cardsGerados = [];

// Função para carregar JSON
function loadNewsJSON(callback) {
    fetch('/src/news-source.json')
        .then(response => response.json())
        .then(data => {
            newsContent = data;
            callback && callback(); 
        })
        .catch(error => console.error('Erro ao carregar JSON:', error));
}


function createCards() {
    const cardsContainer = document.querySelector('.posts__cards');
    if(!cardsContainer) return; // não existe na página atual

    newsContent.forEach(card => {
        const divCard = document.createElement('div');
        divCard.classList.add('cards__card');

        const divImgContainer = document.createElement('div');
        divImgContainer.classList.add('card-image-container');
        const img = document.createElement('img');
        img.classList.add('card-image');
        img.src = card.image;
        divImgContainer.appendChild(img);

        divCard.appendChild(divImgContainer);

        const cardTitle = document.createElement('p');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = card.title;
        divCard.appendChild(cardTitle);

        const cardDescription = document.createElement('p');
        cardDescription.classList.add('card-description');
        cardDescription.textContent = card.description;
        divCard.appendChild(cardDescription);

        // Clique vai para a página da notícia
        divCard.addEventListener("click", () => {
            window.location.href = `/noticias.html?id=${card.id}`;
        });

        cardsGerados.push(divCard);
        cardsContainer.appendChild(divCard);
    });
}


function fillNotice() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if(!id) return;

    const notice = newsContent.find(n => n.id == id);
    if(!notice) return;

    const titleEl = document.querySelector('.noticia-destaque__title');
    const sumEl = document.querySelector('.noticia-destaque__summary');
    const imgEl = document.querySelector('.noticia-destaque__img');
    const textEl = document.querySelector('.content__text');

    if(titleEl) titleEl.textContent = notice.title;
    if(sumEl) sumEl.textContent = notice.description;
    if(imgEl) imgEl.src = notice.image;
    if(textEl) textEl.textContent = notice.content;
}

document.addEventListener("DOMContentLoaded", () => {
    loadNewsJSON(() => {
        
        if(document.querySelector('.posts__cards')) {
            createCards();
        }

        // Se existir container de notícia → estamos em noticias.html
        if(document.querySelector('.noticia-destaque__title')) {
            fillNotice();
        }
    });
});
