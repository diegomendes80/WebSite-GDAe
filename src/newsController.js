import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAg35NSYeocb77Q0oJEFLoT_QidZqVjlog",
  authDomain: "gdae-website.firebaseapp.com",
  databaseURL: "https://gdae-website-default-rtdb.firebaseio.com",
  projectId: "gdae-website",
  storageBucket: "gdae-website.firebasestorage.app",
  messagingSenderId: "1060547032548",
  appId: "1:1060547032548:web:1b24b6d517b592434483f1",
  measurementId: "G-D64CRYBFSJ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const noticiasRef = ref(db, "noticias");

//evento de cadastro de nova noticia no banco de dados
const form = document.querySelector(".criar-noticia__form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const imagemURL = document.getElementById("imagem").value;
    const titulo = document.getElementById("titulo").value;
    const resumo = document.getElementById("resumo").value;
    const conteudo = document.getElementById("conteudo").value;
    const fonte = document.getElementById("fonte").value;
    const data = document.getElementById("data").value;
    const autor = document.getElementById("autor").value;

    const novaNoticia = {
      id: "card" + Date.now(),
      title: titulo,
      image: imagemURL,
      alt: titulo,
      description: resumo,
      content: conteudo,
      fonte: fonte,
      date: data,
      author: autor
    };

    set(ref(db, "noticias/" + novaNoticia.id), novaNoticia)
      .then(() => {
        alert("Notícia salva com sucesso!");
        form.reset(); 
      })
      .catch((error) => {
        console.error("Erro ao salvar notícia:", error);
      });
  });
}

let newsContent = [];
let cardsGerados = [];

//evento de criação de cards na pagina principal
function createCards() {
  const cardsContainer = document.querySelector('.posts__cards');
  if(!cardsContainer) return;
  cardsContainer.innerHTML = "";
  cardsGerados = [];

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

    divCard.addEventListener("click", () => {
      window.location.href = `/noticias.html?id=${card.id}`;
    });

    cardsGerados.push(divCard);
    cardsContainer.appendChild(divCard);
  });
}

//evento de carregar noticia principal na pagina de noticias
function fillNotice(id) {
  const notice = newsContent.find(n => n.id == id);
  if(!notice) return;

  const titleEl = document.querySelector('.noticia-destaque__title');
  const sumEl = document.querySelector('.noticia-destaque__summary');
  const imgEl = document.querySelector('.noticia-destaque__img');
  const textEl = document.querySelector('.content__text');
  const dateEl = document.querySelector('.footer__date');
  const sourceEl = document.querySelector('.footer__source');
  const authorEl = document.querySelector('.footer__author');

  if(titleEl) titleEl.textContent = notice.title;
  if(sumEl) sumEl.textContent = notice.description;
  if(imgEl) imgEl.src = notice.image;
  if(textEl) textEl.textContent = notice.content;
  if(dateEl) dateEl.textContent = `Data: ${notice.date}`;
  if(sourceEl) sourceEl.textContent = `Fonte: ${notice.fonte}`;
  if(authorEl) authorEl.textContent = `Autor: ${notice.author}`;
}

//faz o gerenciamento de quando tem que criar os cards na pagina principal e quando criar na pagina de noticias
document.addEventListener("DOMContentLoaded", () => {
  onValue(noticiasRef, (snapshot) => {
    if(snapshot.exists()){
      const data = snapshot.val();
      const allNews = Object.values(data);
      newsContent = allNews;

      // Cria cards na seção de posts
      if(document.querySelector('.posts__cards')) createCards();

      // Página de notícia detalhada
      if(document.querySelector('.noticia-destaque__title')){
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id") || allNews[allNews.length - 1].id; // se não tiver id, pega a última
        fillNotice(id);

        const mainNoticias = document.querySelector('.main-noticias');
        const footer = document.querySelector('.footer');
        if(mainNoticias) mainNoticias.classList.remove('hidden');
        if(footer) footer.classList.remove('hidden');
      }
    }
  }, { onlyOnce: true });
});
