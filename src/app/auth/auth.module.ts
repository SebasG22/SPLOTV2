import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.router';
import { COMPONENTS } from './components';
import { PAGES } from './pages';
import { SERVICES } from './services';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from './effects';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { reducers } from './reducers/auth.reducer';
import { CommonModule } from '@angular/common';
import { storeLogger } from 'ngrx-store-logger';
import { UsersModule } from '../users/users.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('AuthFeatureModel', reducers),
    EffectsModule.forFeature(EFFECTS),
    UsersModule
  ],
  exports: [],
  declarations: [ COMPONENTS, PAGES],
  providers: [SERVICES]
})
export class AuthModule {}
