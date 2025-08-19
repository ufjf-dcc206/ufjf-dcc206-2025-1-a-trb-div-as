import { type Cartas } from "./jogoFuncionamento"; // Mantenha o import do seu tipo

export class componentCarta extends HTMLElement {
  private _cartaDados: Cartas | null = null;
  private _selecionada: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set carta(dados: Cartas) {
    this._cartaDados = dados;
    this.render();
  }

  get selecionada(): boolean {
    return this._selecionada;
  }
  
  public estadoSelecao(): void {
    this._selecionada = !this._selecionada;
    this.classList.toggle("selecionada", this._selecionada);
  }

  private render(): void {
    if (!this._cartaDados || !this.shadowRoot) return;

    const { nome, naipe } = this._cartaDados;

    let simboloNaipe = "";
    let corNaipe = "";

    switch (naipe) {
      case "copas":
        simboloNaipe = "♥";
        corNaipe = "#d11f3f"; // Cor do .naipeVermelho
        break;
      case "ouros":
        simboloNaipe = "♦";
        corNaipe = "#d11f3f"; // Cor do .naipeVermelho
        break;
      case "espadas":
        simboloNaipe = "♠";
        corNaipe = "#0b0226"; // Cor do .naipePreto
        break;
      case "paus":
        simboloNaipe = "♣";
        corNaipe = "#0b0226"; // Cor do .naipePreto
        break;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: 60px;
          height: 100px;
          border: 1px solid #333;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
          background-color: #fff;
          font-weight: bold;
          font-size: 20px; 
          position: relative;
          text-align: center;
          cursor: pointer;
          color: ${corNaipe}; 
          transition: all 0.2s; 
        }
        :host(:hover) {
          background-color: #dedcdc;
          transform: translateY(-5px);
        }
        :host(.selecionada) {
          transform: translateY(-10px);
          border: 2px solid #350e53;
          box-shadow: 0 4px 8px rgba(71, 71, 71, 0.3);
        }
        .nomeCarta {
          position: absolute;
          top: 5px;
          left: 5px;
          font-size: 38px; 
        }

        .iconeNaipe {
          position: absolute;
          bottom: 5px;
          right: 5px;  
          font-size: 45px;
        }
      </style>
      
      <div class="nomeCarta">${nome}</div>
      <div class="iconeNaipe">${simboloNaipe}</div>
    `;
  }
}

// Registra o componente para que a tag <carta-jogo> funcione
customElements.define("carta-jogo", componentCarta);