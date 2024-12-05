
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM totalmente carregado");
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Botão clicado");
      const mainContent = document.querySelector("main");
      const header = document.querySelector("header");

      mainContent.style.filter = "blur(5px)";
      header.style.filter = "blur(5px)";

      const modal = document.getElementById("modal");
      modal.style.display = "flex";
    });
  });

  const closeButton = document.querySelector(".modal-close-button");
  closeButton.addEventListener("click", () => {
    console.log("Botão de fechar modal clicado");
    const mainContent = document.querySelector("main");
    const header = document.querySelector("header");

    mainContent.style.filter = "none";
    header.style.filter = "none";

    const modal = document.getElementById("modal");
    modal.style.display = "none";
  });

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", () => {
    
  });
});
