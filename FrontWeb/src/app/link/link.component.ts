import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from "./Model/link";
import { LinkService } from './services/link.service';
import { Router } from '@angular/router';
import { MensagemService } from '../app-util/mensagem-service';
import { Grupo } from './Model/grupo';
import { GrupoService } from './services/grupo.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})

export class LinkComponent implements OnInit {

  links: Link[];
  grupos: Grupo[];
  edicaoLink: boolean = false;
  edicaoGrupo: boolean = false;
  formAlterandoLink: Link = new Link();
  formAlterandoGrupo: Grupo = new Grupo();
  mostrarModal: boolean = false;
  mostrarModalGrupo: boolean = false;

  constructor(
    private linkService: LinkService, 
    private grupoService: GrupoService,
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
      this.openModalDialogGrupo();
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

  openModalDialogGrupo() {
    this.edicaoGrupo = false;
    this.reloadGrupos();
    this.mostrarModalGrupo = true;
  }

  closeModalDialogGrupo() {
    this.mostrarModalGrupo = false;
  }

  cancelarGrupo() {
    this.edicaoGrupo = false;
    this.formAlterandoGrupo = new Grupo();
    this.reloadGrupos();
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

  deleteGrupo(id: number){
    this.grupoService.deleteGrupo(id).subscribe(
      data => {
        console.log(data);
        this.reloadGrupos();
      },
      error => console.log(error)
    );
  }

  editaGrupo(id: number) {
    this.grupoService.getGrupo(id).subscribe(grupo => {
      this.formAlterandoGrupo = grupo;
      this.edicaoGrupo = true;
    });
  }

  reloadGrupos(){
    this.grupoService.getGruposList(this.formAlterandoLink.idEnderecoLink).subscribe((grupos: Grupo[]) => {
      this.grupos = grupos;
    });
  }

  gravarGrupo() {
    if(this.verificarFormularioGrupo()) {
      if (!this.edicaoGrupo) {
        this.formAlterandoGrupo.enderecoLink = this.formAlterandoLink;
        this.grupoService.createGrupo(this.formAlterandoGrupo).subscribe(() => {
          this.mensagem.sucesso("Grupo", "Grupo Inserido com sucesso.");
          this.cancelarGrupo();
        });
      } else {
        this.grupoService.updateGrupo(this.formAlterandoGrupo.idGrupo, this.formAlterandoGrupo).subscribe(() => {
          this.mensagem.sucesso("Grupo", "Grupo Alterado com sucesso.");
          this.edicaoGrupo = false;
          this.cancelarGrupo();
        });
      }
    }
  }

  verificarFormularioGrupo() {
    let msg = "";

    this.grupos.forEach(grupo => {
      if(this.formAlterandoGrupo.ordem == grupo.ordem) {
        msg += " Esta Ordem já existe. Deve ser informado uma ordem diferente da atual. ";
      }
    });

    if (this.formAlterandoGrupo.nome == null || this.formAlterandoGrupo.nome == "") {
      msg += " Digite o nome do Grupo. ";
    }

    if (this.formAlterandoGrupo.url == null || this.formAlterandoGrupo.url == "") {
      msg += " Digite a URL do Grupo. ";
    }

    if (msg) {
      this.mensagem.alerta('Grupo', msg);
      return false;
    }

    return true;
  }
}
