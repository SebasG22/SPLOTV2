import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserDetailPage } from './pages/user-detail/user-detail.page';
import { UserIsAuthenticate } from '../auth/guards/user-is-authenticate.guard';
import { UserEditPage } from './pages/user-edit/user-edit.page';
import { UserListPage } from './pages/user-list/user-list.page';

const routes: Routes = [
    {
        path: '', canActivateChild: [], children: [
            { path: '', component: UserListPage },
            { path: ':id/detail', component: UserDetailPage },
            { path: ':id/edit', component: UserEditPage }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
