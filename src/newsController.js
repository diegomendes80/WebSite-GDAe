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


//evento de cadastrar uma nova notícia
const form = document.querySelector(".criar-noticia__form");
if(form){
  form.addEventListener("submit", (e) => {
  e.preventDefault();

  const imagemURL = document.getElementById("imagem").value; // URL da imagem
  const titulo = document.getElementById("titulo").value;
  const resumo = document.getElementById("resumo").value;
  const conteudo = document.getElementById("conteudo").value;
  const fonte = document.getElementById("fonte").value;
  const data = document.getElementById("data").value;
  const autor = document.getElementById("autor").value;

  // Monta o objeto da notícia
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

  console.log(novaNoticia); 

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


//evento criação dos cards

let newsContent = [];
let cardsGerados = [];

onValue(noticiasRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();

    // Converte objeto em array
    const newsContent = Object.values(data);

    // Aqui você pode chamar sua função que gera os cards
    gerarCards(newsContent);
  } else {
    console.log("Nenhuma notícia encontrada.");
  }
});


function createCards() {
    const cardsContainer = document.querySelector('.posts__cards');
    if(!cardsContainer) return; // não existe na página atual

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


document.addEventListener("DOMContentLoaded", () => {
  const noticiasRef = ref(db, "noticias");

   onValue(noticiasRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      newsContent = Object.values(data);

      if (document.querySelector('.posts__cards')) {
        createCards();
      }

      if (document.querySelector('.noticia-destaque__title')) {
        fillNotice();
        document.querySelector('.main-noticias').style.display = "flex";
        document.querySelector('.footer').style.display = "flex";
      }
    } else {
      console.log("Nenhuma notícia encontrada.");
    }
  });
});

