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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DocListMenuComponent } from './components/doc-list-menu/doc-list-menu.component';
import { DocListImportDialogComponent } from './components/doc-list-import-dialog/doc-list-import-dialog.component';
import { DocListExportDialogComponent } from './components/doc-list-export-dialog/doc-list-export-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentDocComponent,
    DocListComponent,
    DocListMenuComponent,
    DocListImportDialogComponent,
    DocListExportDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    DocDbModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
