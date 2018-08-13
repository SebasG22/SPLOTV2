import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: true })
  verifyAuth$ = this.actions$.ofType(authActions.VERIFY_AUTH).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.listenAuth().pipe(
        map(user => {
          if (user) {
            return new authActions.LoginSuccess({name: user.displayName, email: user.email});
          }
          return new authActions.VerifyAuthSuccess();
        })
      )
    )
  );

  @Effect({ dispatch: false })
  loginWithEmail$ = this.actions$.ofType(authActions.LOGIN_WITH_EMAIL).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.loginWithEmail(payload).pipe(
        map(() => {
          console.log('Logged with email');
        })
      )
    )
  );

  @Effect()
  loginWithGoogle$ = this.actions$.ofType(authActions.LOGIN_WITH_GOOGLE).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.loginWithGoogle().pipe(
        tap(console.log),
        map(data => data.additionalUserInfo.profile),
        map(data => {
          console.log('Logged with google', data);
          return new authActions.LoginSuccess({
            name: data.name,
            email: data.email
          });
        })
      )
    )
  );

  @Effect({ dispatch: false })
  loginWithGithub$ = this.actions$.ofType(authActions.LOGIN_WITH_GITHUB).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.loginWithGithub().pipe(
        map(() => {
          console.log('Logged with github');
        })
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.ofType(authActions.LOGIN_SUCCESS).pipe(
    map(() => {
      /* Doing this avoid instead of components on change view -> [ Angular Error]
      * https://github.com/angular/angular/issues/20290
      */
      this.zone.run(() => { this.router.navigate(['/home']); });
      // this.router.navigate(['/home']);
    } )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  @Effect()
  public init$: Observable<Action> = defer(() =>
    of(new authActions.VerifyAuth())
  );
}
