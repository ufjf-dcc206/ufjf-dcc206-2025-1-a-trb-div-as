import "./style.css";
import { type Cartas } from "./tipos";
import { baralho } from "./baralho";
import { mao, maoInicial, renderizarMão, indicesSelecionados } from "./mao";

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

  //busca todos elementos que foram selecionadas
  const cartasSelecionadas = document.querySelectorAll(".carta.selecionada");

  //verifica se tem pelo menos uma carta selecionada
  if (cartasSelecionadas.length === 0) {
    console.log("Nenhuma carta foi selecionada");
    return;
  }

  const cartasJogadas: Cartas[] = [];

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

    //atribui nome e icone 
    const nomeCarta = nomeCartaElemento.textContent;
    const iconeNaipe = simboloNaipeElemento.textContent;

    //"traduz" os simbolos em nomes 
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

    //atribui minha primeira ocorrencia 
    const cartaEncontrada = mao.find(
      (cartaJ) => String(cartaJ.nome) === nomeCarta && cartaJ.naipe === naipe
    );

    //se a carta existir, é adicionada ao vetor 
    if (cartaEncontrada) {
      cartasJogadas.push(cartaEncontrada);
    }
  });
  
  console.log("Cartas jogadas:", cartasJogadas);
  console.log(indicesSelecionados);
});

botaoDescartarCartas.addEventListener("click", () => {});
