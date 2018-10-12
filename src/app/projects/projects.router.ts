import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectMainPage } from './pages/project-main/project-main.page';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectDetailPage } from './pages/project-detail/project-detail.page';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', component: ProjectMainPage },
            { path: ':id/detail', component: ProjectDetailPage }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }
