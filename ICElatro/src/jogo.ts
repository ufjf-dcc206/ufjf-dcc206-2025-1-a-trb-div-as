import { cartasJogadas } from "./main";

export let pontos = 0;
export let raridade = 0;
export let total = 0;

export function verificaCombinacoes() {
  if (cartasJogadas.length < 5) {
    maiorCarta();
    return;
  }
  else if (quadra()) {
    pontos = calculaPontos();
    raridade = 6;
    total = pontos * raridade;
  } 
  else if (fullHouse()) {

  } 
  else if (flush()) {

  } 
  else if (trinca()) {
    pontos = calculaPontos();
    raridade = 3;
    total = pontos * raridade;
  } 
  else if (duplas()) {

  } 
  else {
    maiorCarta();
  }
}

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

function fullHouse() {}

function flush() {}

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

function duplas() {}

function maiorCarta(): void {
  let maiorC = cartasJogadas[0].pontos;
  for (let i = 1; i < cartasJogadas.length; i++) {
    if (cartasJogadas[i].pontos > maiorC) maiorC = cartasJogadas[i].pontos;
  }
  pontos = maiorC;
  raridade = 1;
  total = pontos * raridade;
}

function calculaPontos(): number {
  let soma = 0;
  for (let i = 0; i < cartasJogadas.length; i++) {
    soma += cartasJogadas[i].pontos;
  }
  return soma;
}
