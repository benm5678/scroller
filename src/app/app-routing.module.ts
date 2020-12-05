import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocListMenuComponent } from './components/doc-list-menu/doc-list-menu.component';

const routes: Routes = [
  { path: 'auth-dropbox', component: DocListMenuComponent, data: { gotDropboxAuth: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
