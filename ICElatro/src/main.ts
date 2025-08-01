import "./style.css";

//botões
const botaoJogar = document.getElementById("bJogar") as HTMLButtonElement;
const botaoTutorial = document.getElementById("bTutorial") as HTMLButtonElement;

//tela inicial e tela jogo
const telaInicial = document.getElementById("telaInicial") as HTMLDivElement;
const telaJogo = document.getElementById("telaJogo") as HTMLDivElement;

//tipo cartas
type Cartas = {
  nome: string | number;
  naipe: string;
  pontos: number;
};

//criação do baralho
const baralho: Cartas[] = [];
["copas", "paus", "espadas", "ouros"].forEach((n) => {
  [2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((v) => {
    baralho.push({ nome: v, naipe: n, pontos: v });
  });
  ["J", "Q", "K"].forEach((v) => {
    baralho.push({ nome: v, naipe: n, pontos: 10 });
  });
  baralho.push({ nome: "A", naipe: n, pontos: 15 });
});

//criação da mão
let mao: Cartas[] = [];

//função para embaralhar o baralho
function embaralharBaralho(baralho: Cartas[]): Cartas[] {
  const baralhoEmbaralhado = [...baralho];
  for (let i = baralhoEmbaralhado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baralhoEmbaralhado[i], baralhoEmbaralhado[j]] = [
      baralhoEmbaralhado[j],
      baralhoEmbaralhado[i],
    ];
  }
  return baralhoEmbaralhado;
}

//função para separar a mão inicial
function maoInicial(baralho: Cartas[]) {
  const baralhoEmbaralhado = embaralharBaralho(baralho);
  mao = [];
  for (let i = 0; i < 8; i++) {
    mao.push(baralhoEmbaralhado[i]);
  }
}

//função para renderizar a mão na tela
function renderizarMão() {
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

//função para iniciar o jogo
function iniciarJogo(
  telaInicial: HTMLDivElement,
  telaJogo: HTMLDivElement,
  baralho: Cartas[]
) {
  telaInicial.style.display = "none"; //tira a tela inicial
  telaJogo.style.display = "block"; //inicia a tela do jogo
  maoInicial(baralho);
  renderizarMão();
}

//ações dos botões "Jogar" e "Tutorial"
botaoJogar.addEventListener("click", () => {
  iniciarJogo(telaInicial, telaJogo, baralho);
});

botaoTutorial.addEventListener("click", () => {});
