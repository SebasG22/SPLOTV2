import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: true })
  verifyAuth$ = this.actions$.ofType(authActions.VERIFY_AUTH).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.listenAuth().pipe(
        map(user => {
          console.log('verify auth' , user);
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
    map(() => this.router.navigate(['/home']))
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  public init$: Observable<Action> = defer(() =>
    of(new authActions.VerifyAuth())
  );
}
