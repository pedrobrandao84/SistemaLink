import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuario/Model/usuario';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticado: boolean;
  private usuarioLogado: Usuario;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router,
              private usuarioService: UsuarioService) { }

  fazerLogin(usuario: Usuario){

    this.usuarioService.loginUsuario(usuario).subscribe(user => {
      if (user) {
        this.usuarioAutenticado = true;
        this.usuarioLogado = user;
        this.mostrarMenuEmitter.emit(true);
  
        this.router.navigate(['link']);
      } else {
        this.usuarioAutenticado = false;

        this.mostrarMenuEmitter.emit(false);
      }
    });
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

  retornaUsuarioLogado(){
    return this.usuarioLogado;
  }
}
