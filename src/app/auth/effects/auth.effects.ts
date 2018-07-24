import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
    @Effect({ dispatch: false})
    loginWithEmail$ = this.actions$
      .ofType(authActions.LOGIN_WITH_EMAIL).pipe(
      map((action: any) => action.payload),
      switchMap(payload => this.authService.loginWithEmail(payload)
    .pipe(map(() => {
        console.log('Logged with email');
    }))
      )
    );

    @Effect({ dispatch: false})
    loginWithGoogle$ = this.actions$
      .ofType(authActions.LOGIN_WITH_GOOGLE).pipe(
      map((action: any) => action.payload),
      switchMap(payload => this.authService.loginWithGoogle()
    .pipe(map(() => {
        console.log('Logged with google');
    }))
      )
    );

    @Effect({ dispatch: false})
    loginWithGithub$ = this.actions$
      .ofType(authActions.LOGIN_WITH_GITHUB).pipe(
      map((action: any) => action.payload),
      switchMap(payload => this.authService.loginWithGithub()
    .pipe(map(() => {
        console.log('Logged with github');
    }))
      )
    );

    constructor(private actions$: Actions, private authService: AuthService) {}
}
