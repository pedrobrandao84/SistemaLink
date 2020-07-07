import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from "./Model/link";
import { LinkService } from './link.service';
import { Router } from '@angular/router';
import { MensagemService } from '../app-util/mensagem-service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})

export class LinkComponent implements OnInit {

  links: Link[];
  edicaoLink: boolean = false;
  formAlterandoLink: Link = new Link();
  mostrarModal: boolean = false;

  constructor(
    private linkService: LinkService, 
    private router: Router,
    private mensagem: MensagemService) { }

  ngOnInit(): void {
    this.reloadLinks();
  }

  reloadLinks(){
    this.linkService.getLinksList().subscribe((link: Link[]) => {
      this.links = link;
    });
  }

  deleteLinks(id: number){
    this.linkService.deleteLink(id).subscribe(
      data => {
        console.log(data);
        this.reloadLinks();
      },
      error => console.log(error)
    );
  }

  detalhaLinks(id: number) {
    this.edicaoLink = false;
    this.linkService.getLink(id).subscribe(link => {
      this.formAlterandoLink = link;
      this.openModalDialog();
    });
  }

  editaLinks(id: number) {
    this.edicaoLink = true;
    this.linkService.getLink(id).subscribe(link => {
      this.formAlterandoLink = link;
      this.openModalDialog();
    });
  }

  inserirLink() {
    this.edicaoLink = true;
    this.formAlterandoLink = new Link();
    this.openModalDialog();
  }

  gravarLink() {
    if(this.verificarFormularioLink()) {
      if (!this.edicaoLink) {
        this.linkService.createLink(this.formAlterandoLink).subscribe(() => {
          this.mensagem.sucesso("Link", "Link Inserido com sucesso.");
          this.reloadLinks();
          this.closeModalDialog();
        });
      } else {
        this.linkService.updateLink(this.formAlterandoLink.idEnderecoLink, this.formAlterandoLink).subscribe(() => {
          this.mensagem.sucesso("Link", "Link Alterado com sucesso.");
          this.reloadLinks();
          this.closeModalDialog();
        });
      }
    }
  }

  openModalDialog() {
    this.mostrarModal = true;
  }

  closeModalDialog() {
    this.mostrarModal = false;
  }

  verificarFormularioLink() {
    let msg = "";

    if (this.formAlterandoLink.nome == null || this.formAlterandoLink.nome == "") {
      msg += " Digite o nome do Link. ";
    }

    if (this.formAlterandoLink.url == null || this.formAlterandoLink.url == "") {
      msg += " Digite a URL do Link. ";
    }

    if (this.formAlterandoLink.qtdClicks == null || this.formAlterandoLink.qtdClicks == 0) {
      msg += " Digite a quantidade de cliques do Link. ";
    }

    if (msg) {
      this.mensagem.alerta('Link', msg);
      return false;
    }

    return true;
  }
}
