import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import * as userActions from '../../users/actions/users.actions';
import * as appActions from '../../app.actions';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  // TODO: Review if when the auth changes send to login page
  @Effect({ dispatch: true })
  verifyAuth$ = this.actions$.ofType(authActions.VERIFY_AUTH).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.listenAuth().pipe(
        map(user => {
          if (user) {
            return new authActions.LoginSuccess({
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photo: user.photoURL
            });
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
        switchMap(data => {
          return this.authService.listenAuth().pipe(
            map(auth => {
              console.log(auth);
              return new authActions.LoginSuccess({
                id: auth.uid,
                name: data.name,
                email: data.email,
                photo: data.picture
              });
            })
          );
        })
      )
    ),
    catchError(error => [new authActions.LoginFailed(error)])
  );

  @Effect()
  loginWithGithub$ = this.actions$.ofType(authActions.LOGIN_WITH_GITHUB).pipe(
    map((action: any) => action.payload),
    switchMap(payload =>
      this.authService.loginWithGithub().pipe(
        tap(console.log),
        map(data => data.user),
        switchMap(user => {
          return this.authService.listenAuth().pipe(
            map(auth => {
              console.log(auth);
              return new authActions.LoginSuccess({
                id: auth.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
              });
            })
          );
        })
      )
    ),
    catchError(error => [new authActions.LoginFailed(error)])
  );

  @Effect()
  loginSuccess$ = this.actions$.ofType(authActions.LOGIN_SUCCESS).pipe(
    map((action: any) => action.payload),
    switchMap(userAuth => {
      /* Doing this avoid instead of components on change view -> [ Angular Error]
      * https://github.com/angular/angular/issues/20290
      */
      this.zone.run(() => {
        if (this.router.url === '/') {
                  this.router.navigate(['/home']);
        }
      });
      return [
        new appActions.GetAppPermissions(),
        new userActions.CheckUserRegistration(userAuth)
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private zone: NgZone
  ) {}

  @Effect()
  public init$: Observable<Action> = defer(() =>
    of(new authActions.VerifyAuth())
  );
}
