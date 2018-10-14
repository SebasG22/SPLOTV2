import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectMainPage } from './pages/project-main/project-main.page';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectDetailPage } from './pages/project-detail/project-detail.page';
import { ProjectCreatePage } from './pages/project-create/project-create.page';

const routes: Routes = [
    {
        path: '', children: [
            { path: 'create', component: ProjectCreatePage },
            { path: 'list', component: ProjectMainPage },
            { path: ':id/detail', component: ProjectDetailPage }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }
