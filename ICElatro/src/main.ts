import "./style.css";
import { type Cartas } from "./tipos";
import { baralho } from "./baralho";
import { mao, maoInicial, renderizarMão } from "./mao";

//tela inicial e tela jogo
export const telaInicial = document.getElementById("telaInicial") as HTMLDivElement;
export const telaJogo = document.getElementById("telaJogo") as HTMLDivElement;

//botões tela inicial
export const botaoJogar = document.getElementById("bJogar") as HTMLButtonElement;
export const botaoTutorial = document.getElementById("bTutorial") as HTMLButtonElement;

//botões tela jogo
const botaoJogarCartas = document.getElementById("bJogarCartas") as HTMLButtonElement;
const botaoDescartarCartas = document.getElementById("bDescartarCartas") as HTMLButtonElement;

//função para iniciar o jogo
export function iniciarJogo(
  telaInicial: HTMLDivElement,
  telaJogo: HTMLDivElement,
  baralho: Cartas[]
) {
  telaInicial.style.display = "none"; //tira a tela inicial
  telaJogo.style.display = "block"; //inicia a tela do jogo
  maoInicial(baralho);
  renderizarMão();
}

//ações dos botões "Jogar" e "Tutorial" (dentro da tela inicial)
botaoJogar.addEventListener("click", () => {
  iniciarJogo(telaInicial, telaJogo, baralho);
});

botaoTutorial.addEventListener("click", () => {});

//ações dos botões "Jogar" e "Descartar" (dentro do jogo)
botaoJogarCartas.addEventListener("click", () => {
  const cartasSelecionadas = document.querySelectorAll(".carta.selecionada");
  if (cartasSelecionadas.length === 0) {
    console.log("Nenhuma carta foi selecionada");
    return;
  }
  const cartasJogadas: Cartas[] = [];

  cartasSelecionadas.forEach((elementoCarta) => {
    const nomeCartaElemento = elementoCarta.querySelector(".nomeCarta");
    const iconeNaipeElemento = elementoCarta.querySelector(".iconeNaipe");

    if (!nomeCartaElemento || !iconeNaipeElemento) {
      console.error("Não foi possível encontrar o nome ou naipe da carta.");
      return;
    }

    const nomeCarta = nomeCartaElemento.textContent;
    const iconeNaipe = iconeNaipeElemento.textContent;

    let naipe = "";
    switch (iconeNaipe) {
      case "♥":
        naipe = "copas";
        break;
      case "♦":
        naipe = "ouros";
        break;
      case "♠":
        naipe = "espadas";
        break;
      case "♣":
        naipe = "paus";
        break;
    }
    const cartaEncontrada = mao.find(
      (c) => String(c.nome) === nomeCarta && c.naipe === naipe
    );
    if (cartaEncontrada) {
      cartasJogadas.push(cartaEncontrada);
    }
  });
  console.log("Cartas jogadas:", cartasJogadas);
});

botaoDescartarCartas.addEventListener("click", () => {});
