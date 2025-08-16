export class Status extends HTMLElement {
  constructor() {
    super();
    // anexa o shadow dom (isola o CSS e o HTML)
    this.attachShadow({ mode: "open" });

    //estilização do css
    this.shadowRoot!.innerHTML = `
      <style>
        #pontuação {
          display: flex;
          flex-direction: column;
          position: absolute;
          left: 40px;
          top: 50%;
          transform: translateY(-80%);
        }

        #pontuação > div {
          padding: 6px 8px;
          background-color: #bdb2f7;
          border: 1px solid #a295e4;
          border-radius: 10px;
          font-weight: bold;
          color: #350e53;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 6px;
        }
      </style>
      <div id="pontuação">
        <div id="pontuacaoNecessaria">Pontuação necessária: <span></span></div>
        <div id="pontuacaoTotal">Pontuação total: <span></span></div>
        <div id="somaDasCartasJogadas">Soma: <span></span></div>
        <div id="raridadeMao">Raridade: <span></span></div>
      </div>
    `;
  }

  //definição do método
  public atualizaStatus(
    pontuacaoNecessaria: number,
    pontuacaoTotal: number,
    soma: number,
    raridade: number
  ) {
    //realiza busca dos elementos no shadow dom
    const pontuacaoNecessariaE = this.shadowRoot!.querySelector(
      "#pontuacaoNecessaria span"
    ) as HTMLSpanElement;
    const pontuacaoTotalE = this.shadowRoot!.querySelector(
      "#pontuacaoTotal span"
    ) as HTMLSpanElement;
    const somaE = this.shadowRoot!.querySelector(
      "#somaDasCartasJogadas span"
    ) as HTMLSpanElement;
    const raridadeE = this.shadowRoot!.querySelector(
      "#raridadeMao span"
    ) as HTMLSpanElement;

    //atualiza o conteudo dos elementos
    pontuacaoNecessariaE.textContent = pontuacaoNecessaria.toString();
    pontuacaoTotalE.textContent = pontuacaoTotal.toString();
    somaE.textContent = soma.toString();
    raridadeE.textContent = raridade.toString();
  }

  //connectedCallback é chamado quando o componente é inserido no dom
  connectedCallback() {
    //inicializa a pontuação
    this.atualizaStatus(100, 0, 0, 0);
  }

  //define o componente pro navegador reconhecer
  static define(): void {
    customElements.define("status-pontuacao", Status);
  }
}
