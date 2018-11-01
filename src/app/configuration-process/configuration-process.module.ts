import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/configuration-process.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './effects';
import { SERVICES } from './services';
import { PAGES } from './pages';
import { COMPONENTS } from './components';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        COMPONENTS,
        PAGES
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('ConfigurationProcessFeatureModel', reducers),
        EffectsModule.forFeature(EFFECTS),
        SharedModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [
        SERVICES
    ],
})
export class ConfigurationProcessModule { }
