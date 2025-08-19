import { emJogo } from "./jogoFuncionamento";
import { type Cartas } from "./jogoFuncionamento";

export type ResultadoCombinacao = {
  //soma simples dos pontos das cartas jogadas
  pontos: number;
  //multiplicador conforme a combinação
  raridade: number;
  // pontos * raridade
  total: number;
  combinacao: string;
};

//função para verificar as combinações
export function verificaCombinacoes(): ResultadoCombinacao {
  if (emJogo.length < 5) {
    let maior = maiorCarta();
    console.log("MAIOR CARTA.");
    return {
      pontos: maior.pontos,
      raridade: 1,
      total: maior.pontos * 1,
      combinacao: "MAIOR CARTA",
    };
  } else if (fullHouse()) {
    const pontos = calculaPontos();
    const raridade = 6;
    const total = pontos * raridade;
    console.log("FULL HOUSE.");
    return { pontos, raridade, total, combinacao: "FULL HOUSE" };

  } else if (flush()) {
    const pontos = calculaPontos();
    const raridade = 5;
    const total = pontos * raridade;
    console.log("FLUSH.");
    return { pontos, raridade, total, combinacao: "FLUSH" };

  } else if (quadra()) {
    const pontos = calculaPontos();
    const raridade = 4;
    const total = pontos * raridade;
    console.log("QUADRA.");
    return { pontos, raridade, total, combinacao: "QUADRA" };

  } else if (trinca()) {
    const pontos = calculaPontos();
    const raridade = 3;
    const total = pontos * raridade;
    console.log("TRINCA.");
    return { pontos, raridade, total, combinacao: "TRINCA" };

  } else if (duplas()) {
    const pontos = calculaPontos();
    const raridade = 2;
    const total = pontos * raridade;
    console.log("DOIS PARES.");
    return { pontos, raridade, total, combinacao: "DOIS PARES" };
    
  } else {
    let maior = maiorCarta();
    console.log("MAIOR CARTA.");
    return {
      pontos: maior.pontos,
      raridade: 1,
      total: maior.pontos * 1,
      combinacao: "MAIOR CARTA",
    };
  }
}

//funções para verificação
function quadra(): boolean {
  for (let i = 0; i < 5; i++) {
    let cont = 0;

    for (let j = 0; j < 5; j++) {
      if (emJogo[i].nome === emJogo[j].nome) {
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
      if (emJogo[i].nome === emJogo[j].nome) {
        cont++;
      }
    }

    if (cont === 3) {
      valorTrinca = emJogo[i].nome;
    }
  }

  if (valorTrinca === "") return false;

  let resto: string[] = [];

  //percorre as cartas para pegar as que não são da trinca
  for (let i = 0; i < 5; i++) {
    if (emJogo[i].nome !== valorTrinca) {
      resto.push(String(emJogo[i].nome));
    }
  }

  if (resto.length !== 2) return false;

  //verifica se as duas cartas restantes formam um par
  return resto[0] === resto[1];
}

function flush(): boolean {
  const naipeRef = emJogo[0].naipe;
  for (let i = 1; i < 5; i++) {
    if (emJogo[i].naipe !== naipeRef) {
      return false;
    }
  }
  return true;
}

function trinca(): boolean {
  for (let i = 0; i < 5; i++) {
    let cont = 0;

    for (let j = 0; j < 5; j++) {
      if (emJogo[i].nome === emJogo[j].nome) {
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

    for (let j = 0; j < emJogo.length; j++) {
      if (emJogo[i].nome === emJogo[j].nome) {
        cont++;
      }
    }

    if (cont === 2) {
      if (!paresEncontrados.includes(String(emJogo[i].nome))) {
        paresEncontrados.push(String(emJogo[i].nome));
      }
    }
  }

  //retorna true se encontrou exatamente 2 pares diferentes, caso contrário false
  return paresEncontrados.length === 2;
}

function maiorCarta(): Cartas {
  let maiorC = emJogo[0];
  for (let i = 1; i < emJogo.length; i++) {
    if (emJogo[i].pontos > maiorC.pontos) maiorC = emJogo[i];
  }
  return maiorC;
}

//função para calcular os pontos
function calculaPontos(): number {
  let soma = 0;
  for (let i = 0; i < emJogo.length; i++) {
    soma += emJogo[i].pontos;
  }
  return soma;
}
