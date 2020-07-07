import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable()
export class MensagemService {
  private SUCCESS = "success";
  private INFO = "info";
  private WARN = "warn";
  private ERROR = "error";
  

  constructor(
    private messageService: MessageService,
  ) {}

  erro(titulo: string, conteudo: string) {
    this.simples(this.ERROR, titulo, conteudo);
  }

  alerta(titulo: string, conteudo: string) {
    this.simples(this.WARN, titulo, conteudo);
  }

  info(titulo: string, conteudo: string) {
    this.simples(this.INFO, titulo, conteudo);
  }

  sucesso(titulo: string, conteudo: string) {
    this.simples(this.SUCCESS, titulo, conteudo);
  }

  multiplos(messagem: Array<Messagem>) {
    this.messageService.addAll(messagem);
  }

  limpar() {
    this.messageService.clear();
  }

  private simples(severidade: string, titulo: string, conteudo: string) {
    this.limpar();
    this.messageService.add({
      severity: severidade,
      summary: titulo,
      detail: conteudo
    });
  }
}

export class Messagem {
  constructor(severidade: string, titulo: string, conteudo: string) {}
}
