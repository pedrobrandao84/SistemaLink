import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from 'src/app/link/app-constants/app.constants';
import { Observable } from 'rxjs';
import { Usuario } from '../Model/usuario';
import { stringify } from 'querystring';

var httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private urlUsuario = AppConstants.BASE_URL_REST + AppConstants.USUARIO;

  getUsuariosList(usuario: Usuario) {
    this.urlUsuario = AppConstants.BASE_URL_REST + AppConstants.USUARIO + "?";
    if(usuario.nome != undefined){
      this.urlUsuario = this.urlUsuario + "nome=" + usuario.nome;
    }
    if(usuario.filtroAtivo != undefined && usuario.filtroAtivo != "Todos"){
      this.urlUsuario = this.urlUsuario + "&ativo=" + usuario.filtroAtivo;
    }
    return this.http.get(this.urlUsuario);
  }

  getUsuario(id: number): Observable<Usuario> {
    this.urlUsuario = AppConstants.BASE_URL_REST + AppConstants.USUARIO;
    return this.http.get<Usuario>(this.urlUsuario + '/' + id);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    this.urlUsuario = AppConstants.BASE_URL_REST + AppConstants.USUARIO;
    return this.http.post<Usuario>(this.urlUsuario, usuario, httpOptions);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    this.urlUsuario = AppConstants.BASE_URL_REST + AppConstants.USUARIO;
    return this.http.put<Usuario>(this.urlUsuario + '/' + id, usuario, httpOptions);
  }
}
