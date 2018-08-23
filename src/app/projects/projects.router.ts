import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectMainPage } from './pages/project-main/project-main.page';

const routes: Routes = [
    { path: '', component: ProjectMainPage }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {}
