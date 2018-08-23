import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects.router';
import { COMPONENTS } from './components';
import { PAGES } from './pages';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        COMPONENTS,
        PAGES
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProjectsRoutingModule
     ],
    exports: [],
    providers: [],
})
export class ProjectsModule {}
