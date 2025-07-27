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

const baralho: Cartas[] = [
  { nome: 2, naipe: "copas", pontos: 2 },
  { nome: 2, naipe: "paus", pontos: 2 },
  { nome: 2, naipe: "espadas", pontos: 2 },
  { nome: 2, naipe: "ouros", pontos: 2 },

  { nome: 3, naipe: "copas", pontos: 3 },
  { nome: 3, naipe: "paus", pontos: 3 },
  { nome: 3, naipe: "espadas", pontos: 3 },
  { nome: 3, naipe: "ouros", pontos: 3 },

  { nome: 4, naipe: "copas", pontos: 4 },
  { nome: 4, naipe: "paus", pontos: 4 },
  { nome: 4, naipe: "espadas", pontos: 4 },
  { nome: 4, naipe: "ouros", pontos: 4 },

  { nome: 5, naipe: "copas", pontos: 5 },
  { nome: 5, naipe: "paus", pontos: 5 },
  { nome: 5, naipe: "espadas", pontos: 5 },
  { nome: 5, naipe: "ouros", pontos: 5 },

  { nome: 6, naipe: "copas", pontos: 6 },
  { nome: 6, naipe: "paus", pontos: 6 },
  { nome: 6, naipe: "espadas", pontos: 6 },
  { nome: 6, naipe: "ouros", pontos: 6 },

  { nome: 7, naipe: "copas", pontos: 7 },
  { nome: 7, naipe: "paus", pontos: 7 },
  { nome: 7, naipe: "espadas", pontos: 7 },
  { nome: 7, naipe: "ouros", pontos: 7 },

  { nome: 8, naipe: "copas", pontos: 8 },
  { nome: 8, naipe: "paus", pontos: 8 },
  { nome: 8, naipe: "espadas", pontos: 8 },
  { nome: 8, naipe: "ouros", pontos: 8 },

  { nome: 9, naipe: "copas", pontos: 9 },
  { nome: 9, naipe: "paus", pontos: 9 },
  { nome: 9, naipe: "espadas", pontos: 9 },
  { nome: 9, naipe: "ouros", pontos: 9 },

  { nome: 10, naipe: "copas", pontos: 10 },
  { nome: 10, naipe: "paus", pontos: 10 },
  { nome: 10, naipe: "espadas", pontos: 10 },
  { nome: 10, naipe: "ouros", pontos: 10 },

  { nome: "A", naipe: "copas", pontos: 15 },
  { nome: "A", naipe: "paus", pontos: 15 },
  { nome: "A", naipe: "espadas", pontos: 15 },
  { nome: "A", naipe: "ouros", pontos: 15 },

  { nome: "J", naipe: "copas", pontos: 10 },
  { nome: "J", naipe: "paus", pontos: 10 },
  { nome: "J", naipe: "espadas", pontos: 10 },
  { nome: "J", naipe: "ouros", pontos: 10 },

  { nome: "Q", naipe: "copas", pontos: 10 },
  { nome: "Q", naipe: "paus", pontos: 10 },
  { nome: "Q", naipe: "espadas", pontos: 10 },
  { nome: "Q", naipe: "ouros", pontos: 10 },

  { nome: "K", naipe: "copas", pontos: 10 },
  { nome: "K", naipe: "paus", pontos: 10 },
  { nome: "K", naipe: "espadas", pontos: 10 },
  { nome: "K", naipe: "ouros", pontos: 10 },
];

//função para iniciar o jogo
function iniciarJogo(telaInicial: HTMLDivElement, telaJogo: HTMLDivElement) {
  telaInicial.style.display = "none"; //tira a tela inicial
  telaJogo.style.display = "block"; //inicia a tela do jogo
};

botaoJogar.addEventListener("click", () => {
  iniciarJogo(telaInicial, telaJogo);
});

botaoTutorial.addEventListener("click", () => {});
