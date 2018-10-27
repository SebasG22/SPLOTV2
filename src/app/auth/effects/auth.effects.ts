import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, defer, from } from 'rxjs';
import {
  catchError, map, switchMap, tap,
  concat, take, skipUntil, skipWhile, filter, distinctUntilChanged, mergeMap
} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import * as userActions from '../../users/actions/users.actions';
import * as appActions from '../../app.actions';
import { ToastrService } from 'ngx-toastr';
import { CheckUserRegistration } from '../../users/actions/users.actions';
import {
  CHECK_AUTH_SESSION_SPLOT,
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_EMAIL,
  LoginFailed,
  LOGIN_WITH_GITHUB,
  CheckAuthSessionSuccess,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LogoutSuccess,
  LOGOUT_SUCCESS,
  LoginSuccess,
  CheckAuthSessionSplot
} from '../actions/auth.actions';
import { OnGoToPageSplot } from 'src/app/shared/actions/router.actions';
import { GetAppPermissions } from '../../app.actions';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: true })
  checkAuthSessionSplot$ = this.actions$.ofType(CHECK_AUTH_SESSION_SPLOT)
    .pipe(
      tap(() => console.log('Se ha ejecutado el check')),
      switchMap(() => {
        return this.authService.listenAuth();
      }),
      distinctUntilChanged(),
      tap((value) => console.log('Este valor', value)),
      mergeMap((userAuth) => {
        console.warn('Check Auth Session', userAuth);
        if (userAuth) {
          return [
            new CheckUserRegistration(userAuth),
            new CheckAuthSessionSuccess()
          ];
        }
        return [
          // new OnGoToPage({ path: ['/'] }),
          new CheckAuthSessionSuccess()
        ];
      })
      // mergeMap(() =>
      //   return [new CheckUserRegistration(userAuth)];

      //   this.authPreviousValue = userAuth;
      //   console.log('User auth', userAuth);
      //   if (userAuth) {
      //     console.warn('entrando');
      //     return [
      //       new CheckUserRegistration(userAuth),
      //       new CheckAuthSessionSuccess()
      //     ];
      //   } else {
      //     return from([
      //       new OnGo({ path: ['/'] }),
      //       new CheckAuthSessionSuccess()
      //     ]);
      //   }
      // })
    );


  @Effect()
  loginWithEmail$ = this.actions$.ofType(LOGIN_WITH_EMAIL).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.loginWithEmail(payload).pipe(
        map(() => {
          console.log('Logged with email');
          return new LoginSuccess();
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
      return new LoginSuccess();
    }),
    catchError(error => [new LoginFailed(error)])
  );

  @Effect()
  loginWithGithub$ = this.actions$.ofType(LOGIN_WITH_GITHUB).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.loginWithGithub()
    ),
    tap(() => console.log('Logged using Github')
    ),
    catchError(error => [new LoginFailed(error)])
  );

  @Effect()
  loginSuccess$ = this.actions$.ofType(LOGIN_SUCCESS).pipe(
    map((action: any) => action.payload),
    switchMap(userAuth => {
      // this.zone.run(() => {
      //   this.router.navigate(['home']);
      // });
      return [
        new OnGoToPageSplot({ path: ['/home'], onlyOnPath: '/' }),
      ];
    })
  );

  @Effect({ dispatch: false })
  loginFailed$ = this.actions$.ofType(LOGIN_FAILED).pipe(
    map((action: any) => action.payload),
    tap(payload => {
      this.zone.run(() => {
        this.toastr.error(payload.message, '¡Error!');
      });
    })
  );

  @Effect()
  logout$ = this.actions$.ofType(LOGOUT).pipe(
    switchMap(() => {
      this.zone.run(() => {
        this.router.navigate(['/']);
      });
      return this.authService.logout();
    }),
    map(() => {
      return new LogoutSuccess();
    })
  );

  @Effect({ dispatch: false })
  logoutSuccess$ = this.actions$.ofType(
    LOGOUT_SUCCESS
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

  @Effect()
  public init$ = defer(() => {
    console.warn('Hey defer');
    return from([
      new GetAppPermissions()
    ]);
    // return of([
    //   ,
    //   new GetAppPermissions]);
  }
  );

}
