import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInformationPage } from './pages/user-information/user-information.page';

const routes: Routes = [
    { path: 'detail', component: UserInformationPage },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
