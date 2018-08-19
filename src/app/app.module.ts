import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.router';
import { MODULES } from './modules';
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppService } from './app.service';
import { storeLogger } from 'ngrx-store-logger';
import { ToastrModule } from 'ngx-toastr';
import { AppEffects } from './app.effects';
import * as appReducer from './app.reducer';

export function logger(reducer: ActionReducer<any>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    StoreModule.forRoot({ 'AppFeatureModel': combineReducers({ app: appReducer.reducer })}, {metaReducers}),
    EffectsModule.forRoot([AppEffects]),
    MODULES,
  ],
  providers: [
    AppService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
