// aut.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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

// Evento de login
const button = document.querySelector('.autentication__button');

button.addEventListener('click', (e) => {
  e.preventDefault();
  const user = document.querySelector('#user').value;
  const password = document.querySelector('#pass').value;

  signInWithEmailAndPassword(auth, user, password)
    .then(userCredential => {
      console.log("Logado:", userCredential.user);
      alert("Login realizado com sucesso!");
    })
    .catch(error => {
      console.error(error.code, error.message);
      alert("Erro no login: " + error.message);
    });
});
