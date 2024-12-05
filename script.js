import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLeSAV2LlEvT41g_LHyZPT9-5n436AxMc",
  authDomain: "chacasamento-1e24a.firebaseapp.com",
  databaseURL: "https://chacasamento-1e24a-default-rtdb.firebaseio.com",
  projectId: "chacasamento-1e24a",
  storageBucket: "chacasamento-1e24a.appspot.com",
  messagingSenderId: "1041870279175",
  appId: "1:1041870279175:web:f9421b256b6077d67a10a2",
  measurementId: "G-D41DT3VKK4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM totalmente carregado");

  document.getElementById("open-modal-button").addEventListener("click", () => {
    const mainContent = document.querySelector("main");
    const header = document.querySelector("header");

    mainContent.style.filter = "blur(5px)";
    header.style.filter = "blur(5px)";

    const modal = document.getElementById("modal");
    modal.style.display = "flex";
  });

  const closeButton = document.querySelector(".modal-close-button");
  closeButton.addEventListener("click", () => {
    const mainContent = document.querySelector("main");
    const header = document.querySelector("header");

    mainContent.style.filter = "none";
    header.style.filter = "none";

    const modal = document.getElementById("modal");
    modal.style.display = "none";
  });

  function toggleAuthMode() {
    const authForm = document.getElementById("auth-form");
    const loginFormHtml = `
      <h2>Login</h2>
      <form id="login-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Login</button>
      </form>
      <p id="toggle-auth">Crie uma conta</p>
    `;

    const registerFormHtml = `
      <h2>Criar conta</h2>
      <form id="register-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Registrar</button>
      </form>
      <p id="toggle-auth">Já possuo uma conta</p>
    `;

    authForm.innerHTML = authForm.innerHTML.includes("Login") ? registerFormHtml : loginFormHtml;
    document.getElementById("toggle-auth").addEventListener("click", toggleAuthMode);

    document.getElementById("login-form")?.addEventListener("submit", loginUser);
    document.getElementById("register-form")?.addEventListener("submit", registerUser);
  }

  async function loginUser(event) {
    event.preventDefault();
    const email = event.target.querySelector('[type="email"]').value.trim();
    const password = event.target.querySelector('[type="password"]').value;

    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      console.log(`Tentando login com email: ${email}`);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Usuário logado:", user);
      sessionStorage.setItem("accessToken", user.stsTokenManager.accessToken);
      window.location.href = "homePage.html";
    } catch (error) {
      console.error("Erro ao logar:", error.message);
      //alert("Erro ao logar: " + error.message);
    }
  }

  async function registerUser(event) {
    event.preventDefault();
    const email = event.target.querySelector('[type="email"]').value.trim();
    const password = event.target.querySelector('[type="password"]').value;

    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Usuário registrado:", user);

      toggleAuthMode();
    } catch (error) {
      console.error("Erro ao registrar:", error.message);
      //alert("Erro ao registrar: " + error.message);
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Usuário logado:", user.email);
      window.location.href = "homePage.html";
    } else {
      console.log("Nenhum usuário logado.");
    }
  });

  document.getElementById("toggle-auth").addEventListener("click", toggleAuthMode);
  document.getElementById("login-form")?.addEventListener("submit", loginUser);
  document.getElementById("register-form")?.addEventListener("submit", registerUser);
});
