import { type Cartas } from "./tipos";
import { embaralharBaralho, baralhoEmbaralhado, baralho } from "./baralho";

//criação da mão
export let mao: Cartas[] = [];

//variável para gerenciar o baralho sendo usado no jogo
export let indiceBaralho: number;

//variável para gerenciar os índices das cartas selecionadas
export let indicesSelecionados: number[] = [];

//função para separar a mão inicial
export function maoInicial() {
  embaralharBaralho(baralho);
  mao = [];
  for (indiceBaralho = 0; indiceBaralho < 8; indiceBaralho++) {
    mao.push(baralhoEmbaralhado[indiceBaralho]);
  }
}

//função para renderizar a mão na tela e selecionar cartas
export function renderizarMão() {
  const cartasNaMao = document.getElementById("cartasNaMao") as HTMLDivElement; //"cartasNaMao" = a mão completa

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

    //faz seleção das cartas e preenche o vetor "indicesSelecionados"
    cartaUnica.addEventListener("click", () => {
      if (cartaUnica.classList.contains("selecionada")) {
        cartaUnica.classList.remove("selecionada");
        indicesSelecionados = indicesSelecionados.filter((i) => i !== indice);
      } else {
        const selecionadas = document.querySelectorAll(".carta.selecionada");
        if (selecionadas.length < 5) {
          cartaUnica.classList.add("selecionada");
          indicesSelecionados.push(indice);
        }
      }
    });

    //adiciona "cartaUnica" no "cartasNaMao"
    cartasNaMao.appendChild(cartaUnica);
  });
}

//função para descartar cartas e atualizar "indiceBaralho"
export function descartarCartas() {
  for (let i = 0; i < indicesSelecionados.length; i++) {
    let j = indicesSelecionados[i];
    mao[j] = baralhoEmbaralhado[indiceBaralho];
    indiceBaralho++;
  }
  renderizarMão();
}
