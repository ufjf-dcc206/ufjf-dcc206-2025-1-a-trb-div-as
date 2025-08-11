import { cartasJogadas } from "./main";

export let pontos = 0;
export let raridade = 0;
export let total = 0;

//função para verificar as combinações
export function verificaCombinacoes() {
  if (cartasJogadas.length < 5) {
    maiorCarta();
    console.log("MAIOR CARTA.");
    return;
  }
  else if (quadra()) {
    pontos = calculaPontos();
    raridade = 6;
    total = pontos * raridade;
    console.log("QUADRA.");
  } 
  else if (fullHouse()) {
    pontos = calculaPontos();
    raridade = 3;
    total = pontos * raridade;
    console.log("FULL HOUSE.");

  } 
  else if (flush()) {
    pontos = calculaPontos();
    raridade = 5;
    total = pontos * raridade;
    console.log("FLUSH.");

  } 
  else if (trinca()) {
    pontos = calculaPontos();
    raridade = 3;
    total = pontos * raridade;
    console.log("TRINCA.");

  } 
  else if (duplas()) {
    pontos = calculaPontos();
    raridade = 3;
    total = pontos * raridade;
    console.log("DUPLA.");
  } 
  else {
    maiorCarta();
    console.log("MAIOR CARTA.");

  }
}

//funções para verificação

function quadra(): boolean {
  for (let i = 0; i < 5; i++) {
    let cont = 0;

    for (let j = 0; j < 5; j++) {
      if (cartasJogadas[i].nome === cartasJogadas[j].nome) {
        cont++;
      }
    }

    if (cont === 4) {
      return true;
    }
  }
  return false;
}

function fullHouse(): boolean {
  let valorTrinca: string | number = "";

  for (let i = 0; i < 5; i++) {
    let cont = 0;

    for (let j = 0; j < 5; j++) {
      if (cartasJogadas[i].nome === cartasJogadas[j].nome) {
        cont++;
      }
    }

    if (cont === 3) {
      valorTrinca = cartasJogadas[i].nome;
    }
  }

  if (valorTrinca === "") return false;

  let resto: string[] = [];

  //percorre as cartas para pegar as que não são da trinca
  for (let i = 0; i < 5; i++) {
    if (cartasJogadas[i].nome !== valorTrinca) {
      resto.push(String(cartasJogadas[i].nome));
    }
  }

  if (resto.length !== 2) return false;

  //verifica se as duas cartas restantes formam um par
  return resto[0] === resto[1];
}

function flush(): boolean {
  const naipeRef = cartasJogadas[0].naipe;
  for (let i = 1; i < 5; i++) {
    if (cartasJogadas[i].naipe !== naipeRef) {
      return false;
    }
  }
  return true;
}

function trinca(): boolean {
  for (let i = 0; i < 5; i++) {
    let cont = 0;

    for (let j = 0; j < 5; j++) {
      if (cartasJogadas[i].nome === cartasJogadas[j].nome) {
        cont++;
      }
    }

    if (cont === 3) {
      return true;
    }
  }

  return false;
}

function duplas(): boolean {
  //vetor para armazenar os valores das cartas que formam pares
  const paresEncontrados: string[] = [];

  for (let i = 0; i < 5; i++) {
    let cont = 0;

    for (let j = 0; j < cartasJogadas.length; j++) {
      if (cartasJogadas[i].nome === cartasJogadas[j].nome) {
        cont++;
      }
    }

    if (cont === 2) {
      if (!paresEncontrados.includes(String(cartasJogadas[i].nome))) {
        paresEncontrados.push(String(cartasJogadas[i].nome));
      }
    }
  }

  //retorna true se encontrou exatamente 2 pares diferentes, caso contrário false
  return paresEncontrados.length === 2;
}

function maiorCarta(): void {
  let maiorC = cartasJogadas[0].pontos;
  for (let i = 1; i < cartasJogadas.length; i++) {
    if (cartasJogadas[i].pontos > maiorC) maiorC = cartasJogadas[i].pontos;
  }
  pontos = maiorC;
  raridade = 1;
  total = pontos * raridade;
}

//função para calcular os pontos
function calculaPontos(): number {
  let soma = 0;
  for (let i = 0; i < cartasJogadas.length; i++) {
    soma += cartasJogadas[i].pontos;
  }
  return soma;
}
