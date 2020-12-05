import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OauthHandlerComponent } from './components/oauth-handler/oauth-handler.component';

const routes: Routes = [
  { path: 'auth-dropbox', component: OauthHandlerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
