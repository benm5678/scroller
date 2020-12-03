import { DocDbModule } from './modules/doc-db/doc-db.module';
import { MaterialModule } from './modules/material/material.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CookieService } from 'ngx-cookie-service';

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
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DocDbModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
