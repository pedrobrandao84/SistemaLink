import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from "./Model/link";
import { LinkService } from './services/link.service';
import { Router } from '@angular/router';
import { MensagemService } from '../app-util/mensagem-service';
import { Grupo } from './Model/grupo';
import { GrupoService } from './services/grupo.service';
import { Usuario } from '../usuario/Model/usuario';
import { AuthService } from '../login/service/auth.service';
import { ConfirmationService, Message } from 'primeng/api';

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
  private usuarioLogado: Usuario;
  msgs: Message[] = [];
  position: string;

  constructor(
    private linkService: LinkService, 
    private grupoService: GrupoService,
    private router: Router,
    private mensagem: MensagemService,
    private authService: AuthService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.retornaUsuarioLogado();
    this.reloadLinks();
  }

  reloadLinks(){
    this.linkService.getLinksListPorUsuario(this.usuarioLogado).subscribe((link: Link[]) => {
      this.links = link;      
    });
  }

  openDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente deletar o Link e todos os seus grupos?',
      header: 'Deleta Link',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.linkService.deleteLink(id).subscribe(
          data => {
            console.log(data);
            this.reloadLinks();
          },
          error => console.log(error)
        );
        this.mensagem.sucesso("Link", "Link e Grupos excluídos com sucesso.");
      },
      reject: () => {
        this.mensagem.sucesso("Link", "Link e Grupos não excluído.");
      }
    });
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
      this.formAlterandoLink.usuario = this.usuarioLogado;
      if (this.formAlterandoLink.idEnderecoLink == undefined) {
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

  deleteGrupo(id: number, ordem: number){
    if (Math.max.apply(Math, this.grupos.map(function(o) {return o.ordem})) != ordem) {
      this.mensagem.erro("Grupo", "Somente permitido exclusão de útimo grupo.");
      return;
    } else {
      this.grupoService.deleteGrupo(id).subscribe(
      data => {
        console.log(data);
        this.reloadGrupos();
        this.mensagem.sucesso("Grupo", "Grupo excluído com sucesso.");
      },
      error => console.log(error)
    );
    }
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
        let ultimaOrdem = this.grupos.length == 0 ? 1 : Math.max.apply(Math, this.grupos.map(function(o) {return o.ordem}));
        this.formAlterandoGrupo.enderecoLink = this.formAlterandoLink;
        this.formAlterandoGrupo.ordem = ultimaOrdem + 1;
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
      if(!this.edicaoLink && this.formAlterandoGrupo.ordem == grupo.ordem) {
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

  onChangeLink(nomeLink: string) {
    let nome = nomeLink.toLowerCase().trim().replace(/\s{2,}/g, " ").replace(/ /g,"-");
    this.formAlterandoLink.url = window.location.href.replace("/link","/url-link") + "?url=" + nome;
  }
}
