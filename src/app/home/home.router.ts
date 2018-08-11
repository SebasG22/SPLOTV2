import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeMainPage } from './pages/home-main/home-main.page';

const routes: Routes = [
    { path: '', component: HomeMainPage },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
