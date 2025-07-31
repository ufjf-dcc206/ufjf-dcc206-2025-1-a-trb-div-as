import "./style.css";

//adiciona botão
const botaoJogar = document.getElementById("bJogar") as HTMLButtonElement;
const botaoTutorial = document.getElementById("bTutorial") as HTMLButtonElement;

//tela inicial e tela jogo
const telaInicial = document.getElementById("telaInicial") as HTMLDivElement;
const telaJogo = document.getElementById("telaJogo") as HTMLDivElement;

//cartas
type Cartas = {
  nome: string | number;
  naipe: string;
  pontos: number;
};

// criando as cartas do baralho
const baralho: Cartas[] = [];
["copas", "paus", "espadas", "ouros"].forEach((n) => {
  [2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((v) => {
    baralho.push({ nome: v, naipe: n, pontos: v });
  });
  ["J", "Q", "k"].forEach((v) => {
    baralho.push({ nome: v, naipe: n, pontos: 10 });
  });
  baralho.push({ nome: "A", naipe: n, pontos: 15 });
});

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

//função para iniciar o jogo
function iniciarJogo(
  telaInicial: HTMLDivElement,
  telaJogo: HTMLDivElement,
  baralho: Cartas[]
) {
  telaInicial.style.display = "none"; //tira a tela inicial
  telaJogo.style.display = "block"; //inicia a tela do jogo
  maoInicial(baralho);
  console.log(mao);
}

botaoJogar.addEventListener("click", () => {
  iniciarJogo(telaInicial, telaJogo, baralho);
});

botaoTutorial.addEventListener("click", () => {});
