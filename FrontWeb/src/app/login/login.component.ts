import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/Model/usuario';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  fazerLogin(){
    this.authService.fazerLogin(this.usuario);
  }

}