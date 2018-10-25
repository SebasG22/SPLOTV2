import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import * as userActions from '../../users/actions/users.actions';
import * as appActions from '../../app.actions';
import { ToastrService } from 'ngx-toastr';
import { CheckUserRegistration } from '../../users/actions/users.actions';
import {
  CHECK_AUTH_SESSION,
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_EMAIL,
  CheckAuthSession,
  LoginFailed,
  LOGIN_WITH_GITHUB,
  CheckAuthSessionSuccess
} from '../actions/auth.actions';
import { OnGo } from 'src/app/shared/actions/router.actions';
import { GetAppPermissions } from '../../app.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  public init$ = defer(() =>
    of(
      [
        new CheckAuthSession,
        new GetAppPermissions
      ]
    )
  );

  @Effect()
  checkAuthSession$ = this.actions$.ofType(CHECK_AUTH_SESSION)
    .pipe(
      switchMap(() => {
        return this.authService.listenAuth();
      }),
      map((userAuth) => {
        if (userAuth) {
          return [
            new CheckUserRegistration(userAuth),
            new CheckAuthSessionSuccess()
          ];
        } else {
          return [
            new OnGo({ path: ['/'] }),
            new CheckAuthSessionSuccess()
          ];
        }
      })
    );


  @Effect({ dispatch: false })
  loginWithEmail$ = this.actions$.ofType(LOGIN_WITH_EMAIL).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.loginWithEmail(payload).pipe(
        map(() => {
          console.log('Logged with email');
        })
      )
    )
  );

  @Effect({ dispatch: false })
  loginWithGoogle$ = this.actions$.ofType(LOGIN_WITH_GOOGLE).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.loginWithGoogle(),
    ),
    tap(() => {
      console.log('Logged using Google');
    }),
    catchError(error => [new LoginFailed(error)])
  );

  @Effect()
  loginWithGithub$ = this.actions$.ofType(LOGIN_WITH_GITHUB).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.loginWithGithub(),
      tap(() => {
        console.log('Logged using Github');
      })
    ),
    catchError(error => [new LoginFailed(error)])
  );

  @Effect()
  loginSuccess$ = this.actions$.ofType(LOGIN_SUCCESS).pipe(
    map((action: any) => action.payload),
    switchMap(userAuth => {

      return [
        new appActions.GetAppPermissions(),
      ];
    })
  );



  @Effect({ dispatch: false })
  loginFailed$ = this.actions$.ofType(authActions.LOGIN_FAILED).pipe(
    map((action: any) => action.payload),
    tap(payload => {
      this.zone.run(() => {
        this.toastr.error(payload.message, '¡Error!');
      });
    })
  );

  @Effect()
  logout$ = this.actions$.ofType(authActions.LOGOUT).pipe(
    switchMap(() => {
      this.zone.run(() => {
        this.router.navigate(['/']);
      });
      return this.authService.logout();
    }),
    map(() => {
      return new authActions.LogoutSuccess();
    })
  );

  @Effect({ dispatch: false })
  logoutSuccess$ = this.actions$.ofType(
    authActions.LOGOUT_SUCCESS
  ).pipe(map(() => {
    window.location.reload();
  }));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private zone: NgZone
  ) { }



}
