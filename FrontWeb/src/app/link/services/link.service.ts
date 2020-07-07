import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants/app.constants';
import { Link } from '../Model/link';

var httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})};

@Injectable({
  providedIn: 'root'
})
export class LinkService {
    
  constructor(private http: HttpClient) { }

  private urlLink = AppConstants.BASE_URL_REST + AppConstants.LINK;

  getLinksList() {
    return this.http.get(`${this.urlLink}`);
  }

  getLink(id: number): Observable<Link> {
    return this.http.get<Link>(this.urlLink + '/' + id);
  }

  createLink(link: Link): Observable<Link> {
    return this.http.post<Link>(this.urlLink, link, httpOptions);
  }

  updateLink(id: number, link: Link): Observable<Link> {
    return this.http.put<Link>(this.urlLink + '/' + id, link, httpOptions);
  }

  deleteLink(id: number): Observable<number> {
    return this.http.delete<number>(this.urlLink + '/' + id, httpOptions);
  }
  
}
