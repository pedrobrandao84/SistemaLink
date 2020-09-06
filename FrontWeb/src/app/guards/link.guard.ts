import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LinkGuard implements CanActivateChild {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
      return true;
  }
}
