import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  setPersistence, 
  browserSessionPersistence 
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Config do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAg35NSYeocb77Q0oJEFLoT_QidZqVjlog",
  authDomain: "gdae-website.firebaseapp.com",
  projectId: "gdae-website",
  storageBucket: "gdae-website.firebasestorage.app",
  messagingSenderId: "1060547032548",
  appId: "1:1060547032548:web:1b24b6d517b592434483f1",
  measurementId: "G-D64CRYBFSJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configura persistência apenas na aba atual
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Sessão limitada à aba atual");
  })
  .catch(err => console.error("Erro ao configurar persistência:", err));

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector('.autentication__button');

  // Evento de login
  if (button) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const user = document.querySelector('#user').value;
      const password = document.querySelector('#pass').value;

      signInWithEmailAndPassword(auth, user, password)
        .then(userCredential => {
          console.log("Logado:", userCredential.user);
          // Redireciona para a página de cadastro/controle de notícias
          
          window.location.href = "newsController.html"; 
          
        })
        .catch(error => {
          console.error(error.code, error.message);
          alert("Erro no login: " + error.message);
        });
    });
  }

  // Verifica se o usuário está logado em páginas restritas
  onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname;

    // Se não estiver logado e não estiver na página de login
    if (!user && !currentPage.includes("aut.html")) {
      window.location.href = "aut.html";
    }
  });
});
