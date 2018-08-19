import { Injectable, NgZone } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as usersActions from '../actions/users.actions';
import { map, tap, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { UserInformation } from '../models';
import { UserProvider } from '../../auth/models';
import { ToastrService } from 'ngx-toastr';
import { isEmpty } from 'lodash';
@Injectable()
export class UserEffects {
  @Effect()
  checkRegistrationUser$ = this.actions$
    .ofType(usersActions.CHECK_USER_REGISTRATION)
    .pipe(
      map((action: any) => action.payload),
      switchMap((payload: UserProvider) => {
        return this.userService.getUserInformation(payload.id).pipe(
          map((data: UserInformation) => {
            // Check user exists on firestore node
            if (!isEmpty(data)) {
              return new usersActions.CheckUserRegistrationSuccess(data);
            }
            // Must register user
            return new usersActions.RegisterUser(payload);
          })
        );
      })
    );

  @Effect()
  registerUser$ = this.actions$.ofType(usersActions.REGISTER_USER).pipe(
    map((action: any) => action.payload),
    switchMap((payload: UserProvider) => {
      return this.userService.registerUserInformation(payload).pipe(
        switchMap(() => {
          return this.userService.getUserInformation(payload.id);
        }),
        map((data: UserInformation) => {
          return new usersActions.RegisterUserSuccess(data);
        })
      );
    })
  );

  @Effect()
  updateUserInformation$ = this.actions$
    .ofType(usersActions.UPDATE_USER_INFORMATION)
    .pipe(
      map((action: any) => action.payload),
      switchMap((payload: UserInformation) => {
        return this.userService.updateUserInformation(payload).pipe(
          map((data: UserInformation) => {
            return new usersActions.UpdateUserInformationSuccess();
          })
        );
      })
    );

  @Effect()
  updateUserInformationSuccess$ = this.actions$
    .ofType(usersActions.UPDATE_USER_INFORMATION_SUCCESS)
    .pipe(
      map((action: any) => action.payload),
      tap(data => {
        this.zone.run(() => {
          this.toastr.success('You have updated your profile', '¡Good Job!');
        });
      })
    );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private zone: NgZone,
    private toastr: ToastrService
  ) {}
}
