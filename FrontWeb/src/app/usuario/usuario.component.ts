import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';
import { MensagemService } from '../app-util/mensagem-service';
import { Usuario } from './Model/usuario';
import { ValidarCpf } from '../app-util/validar-cpf';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  edicaoUsuario: boolean = false;
  formAlterandoUsuario: Usuario = new Usuario();
  formFiltroUsuario: Usuario = new Usuario();
  mostrarModal: boolean = false;
  mask:string;


  constructor(
    private usuarioService: UsuarioService, 
    private router: Router,
    private mensagem: MensagemService) { }

  ngOnInit(): void {
    this.formFiltroUsuario.stAtivo = true;
    this.reloadUsuario();
  }

  reloadUsuario(){
    this.usuarioService.getUsuariosList(this.formFiltroUsuario).subscribe((usuario: Usuario[]) => {
      this.usuarios = usuario;
    });
  }

  editaUsuario(id: number) {
    this.edicaoUsuario = true;
    this.usuarioService.getUsuario(id).subscribe(usuario => {
      this.formAlterandoUsuario = usuario;
      this.openModalDialog();
    });
  }

  inserirUsuario() {
    this.edicaoUsuario = true;
    this.formAlterandoUsuario = new Usuario();
    this.formAlterandoUsuario.stAtivo = true;
    this.openModalDialog();
  }

  gravarUsuario() {
    if(this.verificarFormularioUsuario()) {
      if (this.formAlterandoUsuario.idUsuario == undefined) {
        this.usuarioService.createUsuario(this.formAlterandoUsuario).subscribe(() => {
          this.mensagem.sucesso("Usuário", "Usuário inserido com sucesso.");
          this.reloadUsuario();
          this.closeModalDialog();
        });
      } else {
        this.usuarioService.updateUsuario(this.formAlterandoUsuario.idUsuario, this.formAlterandoUsuario).subscribe(() => {
          this.mensagem.sucesso("Usuário", "Usuário alterado com sucesso.");
          this.reloadUsuario();
          this.closeModalDialog();
        });
      }
    }
  }

  buscarUsuario(){
    this.usuarioService.getUsuariosList(this.formFiltroUsuario).subscribe((usuario: Usuario[]) => {
      this.usuarios = usuario;
    });
  }

  openModalDialog() {
    this.mostrarModal = true;
  }

  closeModalDialog() {
    this.mostrarModal = false;
  }

  cpfcnpjmask() {
    return '000.000.000-009';
  }

 verificarFormularioUsuario() {
  let msg = "";

  if (this.formAlterandoUsuario.nome == null || this.formAlterandoUsuario.nome == "") {
    msg += " Digite o nome do Usuário. ";
  }

  if (this.formAlterandoUsuario.email == null || this.formAlterandoUsuario.email == "") {
    msg += " Digite o email do Usuário. ";
  }

  if (this.formAlterandoUsuario.cpf == null || !ValidarCpf.cpf(this.formAlterandoUsuario.cpf)) {
    msg += " CPF inválido. ";
  }

  if (this.formAlterandoUsuario.senha == null || this.formAlterandoUsuario.senha == "") {
    msg += " Digite a senha do Usuário. ";
  }

  if (msg) {
    this.mensagem.alerta('Usuario', msg);
    return false;
  }

  return true;
}

}
