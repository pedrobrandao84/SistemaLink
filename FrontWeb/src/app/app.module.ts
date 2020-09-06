import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkComponent } from './link/link.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessageService } from 'primeng/api';
import { MensagemService } from './app-util/mensagem-service';
import { UrlLinkComponent } from './url-link/url-link.component';
import { ToastModule } from 'primeng/toast';
import { UsuarioComponent } from './usuario/usuario.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/service/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LinkGuard } from './guards/link.guard';
import {ConfirmationService} from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    LinkComponent,
    UrlLinkComponent,
    UsuarioComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatTableModule,
    DialogModule,
    OverlayPanelModule,
    ToastModule,
    MessagesModule,
    ConfirmDialogModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatTableModule,
  ],
  providers: [
    MessageService,
    MensagemService,
    AuthService,
    AuthGuard,
    LinkGuard,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
