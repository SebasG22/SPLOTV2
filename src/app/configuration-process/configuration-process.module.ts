import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/configuration-process.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './effects';
import { SERVICES } from './services';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('ConfigurationProcessFeatureModel', reducers),
        EffectsModule.forFeature(EFFECTS)
    ],
    exports: [],
    providers: [
        SERVICES
    ],
})
export class ConfigurationProcessModule { }
