import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/Model/usuario';
import { AuthService } from './service/auth.service';
import { ValidarCpf } from '../app-util/validar-cpf';
import { MensagemService } from '../app-util/mensagem-service';
import { UsuarioService } from '../usuario/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  edicaoUsuario: boolean = false;
  formAlterandoUsuario: Usuario = new Usuario();
  mostrarModal: boolean = false;
  mask: string;
  usuarios: Usuario[];

  usuario: Usuario = new Usuario();

  constructor(private authService: AuthService,
    private usuarioService: UsuarioService,
    private mensagem: MensagemService) { }

  ngOnInit() {

  }

  fazerLogin() {
    this.authService.fazerLogin(this.usuario);
  }

  inserirUsuario() {
    this.edicaoUsuario = true;
    this.formAlterandoUsuario = new Usuario();
    this.formAlterandoUsuario.stAtivo = true;
    this.openModalDialog();
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

    this.consultaUsuario();
    if(this.usuarios != undefined && this.usuarios.length > 0) {
      msg += " Usuário já cadastrado. "
    }

    if (msg) {
      this.mensagem.alerta('Usuario', msg);
      return false;
    }

    return true;
  }

  consultaUsuario(){
    let usuario = new Usuario();
    usuario.cpf = this.formAlterandoUsuario.cpf;
    this.usuarioService.getUsuariosList(usuario).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  gravarUsuario() {
    if (this.verificarFormularioUsuario()) {
      this.usuarioService.createUsuario(this.formAlterandoUsuario).subscribe(() => {
        this.mensagem.sucesso("Usuário", "Usuário inserido com sucesso.");
        this.closeModalDialog();
      });
    }
  }

}