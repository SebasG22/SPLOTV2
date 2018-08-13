import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginMainPage } from './pages/login-main/login-main.page';
import { UserIsAuthenticate } from './guards/user-is-authenticate.guard';

const routes: Routes = [{ path: '', component: LoginMainPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

export const routedComponents = [LoginMainPage];
