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

//baralho usado no jogo
let baralhoJogo: Cartas[] = [];

//função para embaralhar o baralho
function embaralharBaralho(baralho: Cartas[]): void {
  baralhoJogo = [...baralho];
  for (let i = baralhoJogo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baralhoJogo[i], baralhoJogo[j]] = [baralhoJogo[j], baralhoJogo[i]];
  } //TIREI O RETURN (?)
}

export let mao: Cartas[] = []; //criação da mão
let emJogo: Cartas[] = []; //cartas em jogo (para análise de combinações)
let descartadas: Cartas[] = []; //cartas descartadas

//função para separar mão inicial
export function maoInicial(): void {
  embaralharBaralho(baralho);
  mao = [];
  for (let i = 0; i < 8; i++) {
    let carta = baralhoJogo.pop();
    if (carta) mao.push(carta); //tira a última carta do baralho e coloca na mão
  }
} //criar mão com web component

export function jogar(indices: number[]): void {
  console.log(indices);

  indices.sort((a, b) => b - a); //ordena os índices (decrescente)
  for(let i = 0; i<indices.length; i++){
    let j = indices[i];
    let carta = mao.splice(j, 1)[0];
    if (carta) emJogo.push(carta);
  }
  console.log(mao, emJogo);

  //verifica combinações (com o array "emJogo") e retorna pontos (?)

  descartaCartasJogadas();
}

function descartaCartasJogadas(): void {
    for(let i = 0; i<emJogo.length; i++) {
        let carta = emJogo.pop();
        if (carta) descartadas.push(carta);
    }
    atualizaMaoJogo();
}

export function descartar(indices: number[]): void {
  console.log(indices);

  indices.sort((a, b) => b - a);
  for(let i = 0; i<indices.length; i++){
    let j = indices[i];
    let carta = mao.splice(j, 1)[0];
    if (carta) descartadas.push(carta);
  }
  console.log(mao, descartadas);
  atualizaMaoJogo();
}

function atualizaMaoJogo(): void {
  //passa cartas do "descartadas" p/ o baralho e do baralho p/ mão
  for (let i = 0; i < descartadas.length; i++) {
    let carta = descartadas.pop();
    if (carta) baralho.push(carta); //CARTAS CONTINUAM NA MESMA ORDEM (MUDAR?)
  }
  while (mao.length < 8) {
    let carta = baralhoJogo.pop();
    if (carta) mao.push(carta);
  }
  console.log("Mão: ", mao);
}
