import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects.router';
import { COMPONENTS } from './components';
import { PAGES } from './pages';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './components/reducers/projects.reducer';

@NgModule({
    declarations: [
        COMPONENTS,
        PAGES
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProjectsRoutingModule,
        ReactiveFormsModule,
        StoreModule.forFeature('ProjectFeatureModel', reducers)
    ],
    exports: [],
    providers: [],
})
export class ProjectsModule { }
