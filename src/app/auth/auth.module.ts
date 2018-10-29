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
import { UsersModule } from '../users/users.module';
import { VerifyAuthComponent } from './components/verify-auth/verify-auth.component';
import { GUARDS } from './guards';
import { ToastrModule, ToastNoAnimationModule, ToastNoAnimation } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('AuthFeatureModel', reducers),
    EffectsModule.forFeature(EFFECTS),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      // toastComponent: ToastNoAnimation
    }),
    UsersModule
  ],
  exports: [],
  declarations: [COMPONENTS, PAGES],
  entryComponents: [VerifyAuthComponent],
  providers: [SERVICES, GUARDS]
})
export class AuthModule { }
