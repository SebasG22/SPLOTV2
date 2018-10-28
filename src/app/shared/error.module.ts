import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ERROR_PAGES_SPLOT } from './pages';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/error.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ERROR_SPLOT_EFFECTS } from './effects';
import { ErrorSplotRoutingModule } from './error.router';

@NgModule({
    declarations: [
        ERROR_PAGES_SPLOT
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('ErrorFeatureModel', reducers),
        EffectsModule.forFeature(ERROR_SPLOT_EFFECTS),
        ErrorSplotRoutingModule
    ],
    exports: [],
    providers: [],
})
export class ErrorSplotModule { }
