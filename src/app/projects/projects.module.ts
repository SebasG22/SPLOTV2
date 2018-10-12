import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects.router';
import { COMPONENTS } from './components';
import { PAGES } from './pages';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './components/reducers/projects.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './effects';
import { SERVICES } from './services';
import { RouterModule } from '@angular/router';

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
        StoreModule.forFeature('ProjectFeatureModel', reducers),
        EffectsModule.forFeature(EFFECTS),
        RouterModule
    ],
    exports: [],
    providers: [
        SERVICES,
        EFFECTS
    ],
})
export class ProjectsModule { }
