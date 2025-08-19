import "./style.css";
import { mao, maoInicial, jogar, descartar } from "./jogoFuncionamento";
import { Status } from "./componentPontuação";
import { componentCarta } from "./componentCarta";

//registra o componente
Status.define();

//tela inicial
const telaInicial = document.getElementById("telaInicial") as HTMLDivElement;
const botaoJogar = document.getElementById("bJogar") as HTMLButtonElement;
const botaoTutorial = document.getElementById("bTutorial") as HTMLButtonElement;
const tutorial = document.getElementById("modalTutorial") as HTMLDivElement;
const botaoFecharTutorial = document.querySelector(".fechar");

//tela jogo
const telaJogo = document.getElementById("telaJogo") as HTMLDivElement;
const botaoJogarCartas = document.getElementById(
  "bJogarCartas"
) as HTMLButtonElement;
const botaoDescartarCartas = document.getElementById(
  "bDescartarCartas"
) as HTMLButtonElement;
const voltarTelaInicial = document.getElementById(
  "voltarTI"
) as HTMLButtonElement;
const statusPontuacao = document.querySelector("status-pontuacao") as Status; // pega a referencia
const perdeu = document.getElementById("modalPerdeu") as HTMLButtonElement;
const botaoFecharP = document.querySelector(".fecharP");
const ganhou = document.getElementById("modalGanhou") as HTMLButtonElement;
const botaoFecharG = document.querySelector(".fecharG");

//variáveis para gerenciar quantas vezes o jogador já jogou ou descartou as cartas
let verificaJogadas = 4;
let verificaDescartes = 3;

//variáveis inicias de pontuação
let pontosNecessarios = 100;
let pontosNivel = pontosNecessarios;
let pontuacaoTotal = 0;

//status das jogadas e descartes
const statusJogadas = document.getElementById(
  "statusJogadas"
) as HTMLDivElement;
const statusDescartes = document.getElementById(
  "statusDescartes"
) as HTMLDivElement;

function atualizaStatus() {
  if (verificaJogadas === 0)
    statusJogadas.textContent = `Você não possui mais jogadas.`;
  else statusJogadas.textContent = `Jogadas restantes: ${verificaJogadas}`;
  if (verificaDescartes === 0)
    statusDescartes.textContent = `Você não possui mais descartes.`;
  else
    statusDescartes.textContent = `Descartes restantes: ${verificaDescartes}`;
}

//função para iniciar o jogo
function iniciarJogo(telaInicial: HTMLDivElement, telaJogo: HTMLDivElement) {
  telaInicial.style.display = "none"; //tira a tela inicial
  telaJogo.style.display = "block"; //inicia a tela do jogo
  maoInicial();
  renderizarMão();
  atualizaStatus();
  statusPontuacao.atualizaStatus(pontosNecessarios, pontuacaoTotal, 0, 0); //inicializa a pontuação inicial do jogo
}

//função para renderizar a mão na tela e selecionar cartas
function renderizarMão() {
  //"cartasNaMao" = a mão completa
  const cartasNaMao = document.getElementById("cartasNaMao") as HTMLDivElement;

  //limpa a mão
  cartasNaMao.innerHTML = ""; 

  mao.forEach((carta, indice) => {
    const cartaElemento = document.createElement("carta-jogo") as componentCarta; //cria o elemento
    cartaElemento.dataset.index = indice.toString();

    cartaElemento.carta = carta;

  //seleção das cartas
    cartaElemento.addEventListener("click", () => {
        const selecionadas = document.querySelectorAll("carta-jogo.selecionada").length;

        if (cartaElemento.selecionada) {
            cartaElemento.estadoSelecao();
        } 
        else if (selecionadas < 5) {
            cartaElemento.estadoSelecao();
        }
    });

    cartasNaMao.appendChild(cartaElemento);
  });
}

//preenche o vetor "indices"
function indicesSelecionados(): number[] {
    const indices: number[] = [];
    const maoCompleta = document.querySelectorAll('#cartasNaMao carta-jogo');

    maoCompleta.forEach((cartaElemento, index) => {
        if (cartaElemento.classList.contains('selecionada')) {
            indices.push(index);
        }
    });
    return indices;
}

function verificaJogo(): void {
  if (verificaJogadas === 0) {
    atualizaStatus();
    perdeu.style.display = "block";
    //fechar o botão do aviso reinicia o jogo
    botaoFecharP?.addEventListener("click", () => {
      if (perdeu) {
        perdeu.style.display = "none";
        verificaJogadas = 4;
        verificaDescartes = 3;
        pontuacaoTotal = 0;
        pontosNecessarios = 100;
        pontosNivel = pontosNecessarios;
        iniciarJogo(telaInicial, telaJogo);
      }
    });
  } else atualizaStatus();
}

//ações dos botões "Jogar" e "Tutorial" (tela inicial)
botaoJogar.addEventListener("click", () => {
  iniciarJogo(telaInicial, telaJogo);
});

botaoTutorial.addEventListener("click", () => {
  if (tutorial) tutorial.style.display = "block";
});

botaoFecharTutorial?.addEventListener("click", () => {
  if (tutorial) tutorial.style.display = "none";
});

//ações dos botões "Jogar", "Descartar" (dentro do jogo)
botaoJogarCartas.addEventListener("click", () => {
  const indices = indicesSelecionados();
  if (indices.length === 0) return;
  //verifica se tem pelo menos uma carta selecionada

  //chama a função jogar e armazena o resultado
  const resultadoDaJogada = jogar(indices);

  //acumula os pontos da jogada e diminui os pontos necessários
  pontuacaoTotal += resultadoDaJogada.total;
  pontosNecessarios -= resultadoDaJogada.total;

  if (pontosNecessarios <= 0) {
    //exibir tela venceu
    ganhou.style.display = "block";
    botaoFecharG?.addEventListener("click", () => {
      ganhou.style.display = "none";
    });

    verificaJogadas = 5;
    verificaDescartes = 3;
    pontuacaoTotal = 0;
    resultadoDaJogada.pontos = 0;
    resultadoDaJogada.raridade = 0;
    pontosNecessarios = 2 * pontosNivel;
    pontosNivel = pontosNecessarios;
    maoInicial();
    renderizarMão();
  }

  //atualiza o painel de pontuação
  statusPontuacao.atualizaStatus(
    pontosNecessarios,
    pontuacaoTotal, //usa a variável que está somando a pontuação
    resultadoDaJogada.pontos,
    resultadoDaJogada.raridade
  );

  verificaJogadas--;
  verificaJogo();
  renderizarMão();
});

botaoDescartarCartas.addEventListener("click", () => {
  const indices = indicesSelecionados();
  if (verificaDescartes === 0) return; //verifica se o jogador já atingiu o limite de descartes

  if (indices.length === 0) return;

  descartar(indices);
  verificaDescartes--;
  verificaJogo();
  renderizarMão();
});

//ação de voltar a tela inicial
voltarTelaInicial.addEventListener("click", () => {
  telaJogo.style.display = "none";
  telaInicial.style.display = "block";
});
