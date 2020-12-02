import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CurrentDocComponent } from './components/current-doc/current-doc.component';
import { DocListComponent } from './components/doc-list/doc-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentDocComponent,
    DocListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
