import "./style.css";
import { mao, maoInicial, jogar, descartar } from "./jogoFuncionamento";

//tela inicial
const telaInicial = document.getElementById("telaInicial") as HTMLDivElement;
const botaoJogar = document.getElementById("bJogar") as HTMLButtonElement;
const botaoTutorial = document.getElementById("bTutorial") as HTMLButtonElement;

//tela jogo
const telaJogo = document.getElementById("telaJogo") as HTMLDivElement;
const botaoJogarCartas = document.getElementById("bJogarCartas") as HTMLButtonElement;
const botaoDescartarCartas = document.getElementById("bDescartarCartas") as HTMLButtonElement;

//variáveis para gerenciar quantas vezes o jogador já jogou ou descartou as cartas
let verificaJogadas = 4;
let verificaDescartes = 3;

//função para iniciar o jogo
function iniciarJogo(telaInicial: HTMLDivElement, telaJogo: HTMLDivElement) {
  telaInicial.style.display = "none"; //tira a tela inicial
  telaJogo.style.display = "block"; //inicia a tela do jogo
  maoInicial();
  renderizarMão();
}

let indices: number[] = []; //índices das cartas selecionadas

//função para renderizar a mão na tela e selecionar cartas
function renderizarMão() {
  //"cartasNaMao" = a mão completa
  const cartasNaMao = document.getElementById("cartasNaMao") as HTMLDivElement;

  //limpa a mão
  cartasNaMao.innerHTML = "";

  mao.forEach((carta, indice) => {
    const cartaUnica = document.createElement("div"); //"cartaUnica" = carta individual
    cartaUnica.classList.add("carta");

    //nome da carta
    const nomeCarta = document.createElement("span");
    nomeCarta.classList.add("nomeCarta");
    nomeCarta.textContent = String(carta.nome);

    //símbolo do naipe da carta
    const iconeNaipe = document.createElement("span");
    iconeNaipe.classList.add("iconeNaipe");
    let simboloNaipe = "";
    switch (carta.naipe) {
      case "copas":
        simboloNaipe = "♥";
        cartaUnica.classList.add("naipeVermelho");
        break;
      case "ouros":
        simboloNaipe = "♦";
        cartaUnica.classList.add("naipeVermelho");
        break;
      case "espadas":
        simboloNaipe = "♠";
        cartaUnica.classList.add("naipePreto");
        break;
      case "paus":
        simboloNaipe = "♣";
        cartaUnica.classList.add("naipePreto");
        break;
    }
    iconeNaipe.textContent = simboloNaipe;

    //adiciona "nomeCarta" e "iconeNaipe" na "cartaUnica"
    cartaUnica.appendChild(nomeCarta);
    cartaUnica.appendChild(iconeNaipe);
    cartasNaMao.appendChild(cartaUnica); //adiciona "cartaUnica" no "cartasNaMao"
    //MUDEI DE LUGAR (?)

    //faz seleção das cartas e preenche o vetor "indices"
    cartaUnica.addEventListener("click", () => {
      if (cartaUnica.classList.contains("selecionada")) {
        cartaUnica.classList.remove("selecionada");
        indices = indices.filter((i) => i !== indice);
      } else {
        const selecionadas = document.querySelectorAll(".carta.selecionada");
        if (selecionadas.length < 5) {
          cartaUnica.classList.add("selecionada");
          indices.push(indice);
        }
      }
    });
  });
}

function verificaJogo(): void {
    if(verificaJogadas === 0 && verificaDescartes === 0) {
        verificaJogadas = 4;
        verificaDescartes = 3;
        alert("Número máximo de jogadas e descartes atingidos! O jogo será reiniciado!")
        iniciarJogo(telaInicial, telaJogo);
    }
}

//ações dos botões "Jogar" e "Tutorial" (tela inicial)
botaoJogar.addEventListener("click", () => {
  iniciarJogo(telaInicial, telaJogo);
});

botaoTutorial.addEventListener("click", () => {});

//ações dos botões "Jogar" e "Descartar" (dentro do jogo)
botaoJogarCartas.addEventListener("click", () => {
  if (verificaJogadas === 0) {
    console.log("Você já jogou o número máximo de vezes.");
    return;
  } //verifica se o jogador já atingiu o limite de jogadas

  //verifica se tem pelo menos uma carta selecionada
  if (indices.length === 0) {
    console.log("Nenhuma carta foi selecionada");
    return;
  } 

  jogar(indices);
  indices = [];
  verificaJogadas--;
  verificaJogo();

  renderizarMão();
});

botaoDescartarCartas.addEventListener("click", () => {
  if (verificaDescartes === 0) {
    console.log("Você já descartou o número máximo de vezes.");
    return;
  }  //verifica se o jogador já atingiu o limite de descartes

  if (indices.length === 0) {
    console.log("Nenhuma carta foi selecionada");
    return;
  } 

  descartar(indices);
  indices = [];
  verificaDescartes--;
  verificaJogo();

  renderizarMão();
});