import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeMainPage } from './pages/home-main/home-main.page';
import { UserIsAuthenticate } from '../auth/guards/user-is-authenticate.guard';

const routes: Routes = [
    { path: '', component: HomeMainPage, canActivate: [] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
