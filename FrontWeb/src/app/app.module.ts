import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EnderecolinkComponent } from './enderecolink/enderecolink.component';

@NgModule({
  declarations: [
    AppComponent,
    EnderecolinkComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
