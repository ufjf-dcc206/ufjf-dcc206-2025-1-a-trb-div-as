import { cartasJogadas } from "./main";

export let pontos = 0;
export let raridade = 0;
export let total = 0;

export function verificaCombinacoes() {
  if (cartasJogadas.length < 5) {
    maiorCarta();
    return;
  } else if (quadra()) {
  } else if (fullHouse()) {
  } else if (flush()) {
  } else if (trinca()) {
  } else if (duplas()) {
  } else {
    maiorCarta();
  }
}

function quadra() {}

function fullHouse() {}

function flush() {}

function trinca() {}

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
