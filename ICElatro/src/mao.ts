import { type Cartas } from "./tipos";
import { embaralharBaralho } from "./baralho";

//criação da mão
export let mao: Cartas[] = [];

//função para separar a mão inicial
export function maoInicial(baralho: Cartas[]) {
  const baralhoEmbaralhado = embaralharBaralho(baralho);
  mao = [];
  for (let i = 0; i < 8; i++) {
    mao.push(baralhoEmbaralhado[i]);
  }
}

//função para renderizar a mão na tela e selecionar cartas
export function renderizarMão() {
  const cartasNaMao = document.getElementById("cartasNaMao") as HTMLDivElement; //"cartasNaMao" = a mão completa
  mao.forEach((carta) => {
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

    //seleção das cartas
    cartaUnica.addEventListener("click", () => {
      if (cartaUnica.classList.contains("selecionada")) {
        cartaUnica.classList.remove("selecionada");
      } else {
        const selecionadas = document.querySelectorAll(".carta.selecionada");
        if (selecionadas.length < 5) {
          cartaUnica.classList.add("selecionada");
        }
      }
    });

    //adiciona "cartaUnica" no "cartasNaMao"
    cartasNaMao.appendChild(cartaUnica);
  });
}
