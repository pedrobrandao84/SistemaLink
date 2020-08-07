import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinkComponent } from './link/link.component';
import { UrlLinkComponent } from './url-link/url-link.component';
import { UsuarioComponent } from './usuario/usuario.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'link', component: LinkComponent },
  { path: 'url-link', component: UrlLinkComponent },
  { path: 'usuario', component: UsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
