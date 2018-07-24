import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginMainPage } from './pages/login-main/login-main.page';

const routes: Routes = [{ path: '', component: LoginMainPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

export const routedComponents = [LoginMainPage];
