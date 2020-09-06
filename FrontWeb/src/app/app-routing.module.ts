import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinkComponent } from './link/link.component';
import { UrlLinkComponent } from './url-link/url-link.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LinkGuard } from './guards/link.guard';
import { UsuarioGuard } from './guards/usuario.guard';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'link', component: LinkComponent, canActivate: [AuthGuard], canActivateChild: [LinkGuard] },
  { path: 'url-link', component: UrlLinkComponent },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard], canActivateChild: [UsuarioGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
