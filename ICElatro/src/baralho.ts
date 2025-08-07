import { type Cartas } from "./tipos";

//criação do baralho
export const baralho: Cartas[] = [];
["copas", "paus", "espadas", "ouros"].forEach((n) => {
  [2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((v) => {
    baralho.push({ nome: v, naipe: n, pontos: v });
  });
  ["J", "Q", "K"].forEach((v) => {
    baralho.push({ nome: v, naipe: n, pontos: 10 });
  });
  baralho.push({ nome: "A", naipe: n, pontos: 15 });
});

//função para embaralhar o baralho
export function embaralharBaralho(baralho: Cartas[]): Cartas[] {
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
