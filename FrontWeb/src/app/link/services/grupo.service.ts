import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app-constants/app.constants';
import { Observable } from 'rxjs';
import { Grupo } from '../Model/grupo';
import { Link } from '../Model/link';

var httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})};

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) { }

  private urlGrupo = AppConstants.BASE_URL_REST + AppConstants.GRUPO;

  getGruposList(idLink: number) {
    return this.http.get(this.urlGrupo + '/Link?id=' + idLink);
  }

  getGrupo(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(this.urlGrupo + '/' + id);
  }

  createGrupo(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(this.urlGrupo, grupo, httpOptions);
  }

  updateGrupo(id: number, grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(this.urlGrupo + '/' + id, grupo, httpOptions);
  }

  deleteGrupo(id: number): Observable<number> {
    return this.http.delete<number>(this.urlGrupo + '/' + id, httpOptions);
  }
}
