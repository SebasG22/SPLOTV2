import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'home', loadChildren: './home/home.module#HomeModule' },
    { path: 'user', loadChildren: './users/users.module#UsersModule' },
    { path: 'project', loadChildren: './projects/projects.module#ProjectsModule' },
    { path: 'configuration-process', loadChildren: './configuration-process/configuration-process.module#ConfigurationProcessModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
