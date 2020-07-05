import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Enderecolink } from './enderecolink';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class EnderecolinkService {

  url = 'https://localhost:44336/api/EnderecosLinks';

  constructor(private http: HttpClient) { }
  getAllLinks(): Observable<Enderecolink[]> {  
    return this.http.get<Enderecolink[]>(this.url);  
  }  
  getAlunoById(idEnderecoLink: number): Observable<Enderecolink> {  
    const apiurl = `${this.url}/${idEnderecoLink}`;
    return this.http.get<Enderecolink>(apiurl);  
  } 
  createAluno(link: Enderecolink): Observable<Enderecolink> {  
    return this.http.post<Enderecolink>(this.url, link, httpOptions);  
  }  
  updateAluno(idEnderecoLink: string, link: Enderecolink): Observable<Enderecolink> {  
    const apiurl = `${this.url}/${idEnderecoLink}`;
    return this.http.put<Enderecolink>(apiurl,link, httpOptions);  
  }  
  deleteAlunoById(idEnderecoLink: string): Observable<number> {  
    const apiurl = `${this.url}/${idEnderecoLink}`;
    return this.http.delete<number>(apiurl, httpOptions);  
  }  
}
