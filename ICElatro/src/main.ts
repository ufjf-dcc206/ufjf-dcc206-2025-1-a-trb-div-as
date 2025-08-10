import "./style.css";
import { type Cartas } from "./tipos";
import {
  mao,
  maoInicial,
  renderizarMão,
  indicesSelecionados,
  descartarCartas,
} from "./mao";

//tela inicial e tela jogo
export const telaInicial = document.getElementById(
  "telaInicial"
) as HTMLDivElement;
export const telaJogo = document.getElementById("telaJogo") as HTMLDivElement;

//botões tela inicial
export const botaoJogar = document.getElementById(
  "bJogar"
) as HTMLButtonElement;
export const botaoTutorial = document.getElementById(
  "bTutorial"
) as HTMLButtonElement;

//botões tela jogo
const botaoJogarCartas = document.getElementById(
  "bJogarCartas"
) as HTMLButtonElement;
const botaoDescartarCartas = document.getElementById(
  "bDescartarCartas"
) as HTMLButtonElement;

//armazena as cartas jogadas
export const cartasJogadas: Cartas[] = [];

//variáveis para gerenciar quantas vezes o jogador já jogou ou descartou as cartas
let verificaJogadas = 0;
let verificaDescartes = 0;

//função para iniciar o jogo
export function iniciarJogo(
  telaInicial: HTMLDivElement,
  telaJogo: HTMLDivElement
) {
  telaInicial.style.display = "none"; //tira a tela inicial
  telaJogo.style.display = "block"; //inicia a tela do jogo
  maoInicial();
  renderizarMão();
}

function verificaReiniciarJogo() {
  if(verificaJogadas >= 4 && verificaDescartes >= 3){
    verificaJogadas = 0;
    verificaDescartes = 0;
    reiniciarJogo();
  }
}

function reiniciarJogo() {
  maoInicial();
  renderizarMão();
}

//ações dos botões "Jogar" e "Tutorial" (dentro da tela inicial)
botaoJogar.addEventListener("click", () => {
  iniciarJogo(telaInicial, telaJogo);
});

botaoTutorial.addEventListener("click", () => {});

//ações dos botões "Jogar" e "Descartar" (dentro do jogo)
botaoJogarCartas.addEventListener("click", () => {

  //verifica se o jogador já atingiu o limite de jogadas
  if (verificaJogadas >= 4) {
    console.log("Você já jogou o número máximo de vezes.");
    return;
  }

  //busca todos elementos que foram selecionadas
  const cartasSelecionadas = document.querySelectorAll(".carta.selecionada");

  //verifica se tem pelo menos uma carta selecionada
  if (cartasSelecionadas.length === 0) {
    console.log("Nenhuma carta foi selecionada");
    return;
  }

  //para cada carta selecionada, atribui o nome e o simbolo
  cartasSelecionadas.forEach((elementoCarta) => {
    //busca os elementos HTML
    const nomeCartaElemento = elementoCarta.querySelector(".nomeCarta");
    const simboloNaipeElemento = elementoCarta.querySelector(".iconeNaipe");

    //verifica se existe o elemento
    if (!nomeCartaElemento || !simboloNaipeElemento) {
      console.error("Não foi possível encontrar o nome ou naipe da carta.");
      return;
    }

    //atribui nome e ícone
    const nomeCarta = nomeCartaElemento.textContent;
    const iconeNaipe = simboloNaipeElemento.textContent;

    //"traduz" os símbolos em nomes
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

    //atribui a primeira ocorrência
    const cartaEncontrada = mao.find(
      (cartaJ) => String(cartaJ.nome) === nomeCarta && cartaJ.naipe === naipe
    );

    //se a carta existir, é adicionada ao vetor
    if (cartaEncontrada) {
      cartasJogadas.push(cartaEncontrada);
    }
  });

  verificaJogadas++;

  console.log("Cartas jogadas:", cartasJogadas);
  console.log(indicesSelecionados);

  verificaReiniciarJogo();

  //descarta cartas jogadas
  descartarCartas();
});

botaoDescartarCartas.addEventListener("click", () => {

  //verifica se o jogador já atingiu o limite de descartes
  if (verificaDescartes >= 3) {
    console.log("Você já descartou o número máximo de vezes.");
    return;
  }

  verificaDescartes++;
  verificaReiniciarJogo();

  descartarCartas();
});
