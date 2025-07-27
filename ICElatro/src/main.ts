import "./style.css";

//adiciona botão
const botaoJogar = document.getElementById("bJogar") as HTMLButtonElement;
const botaoTutorial = document.getElementById("bTutorial") as HTMLButtonElement;

//tela inicial e tela jogo
const telaInicial = document.getElementById("telaInicial") as HTMLDivElement;
const telaJogo = document.getElementById("telaJogo") as HTMLDivElement;

//função para iniciar o jogo
function iniciarJogo(telaInicial: HTMLDivElement, telaJogo: HTMLDivElement) {
  telaInicial.style.display = "none"; //tira a tela inicial
  telaJogo.style.display = "block"; //inicia a tela do jogo
};

botaoJogar.addEventListener("click", () => {
  iniciarJogo(telaInicial, telaJogo);
});

botaoTutorial.addEventListener("click", () => {});
