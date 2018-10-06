import { Injectable, NgZone } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as usersActions from '../actions/users.actions';
import { map, tap, switchMap, catchError, delay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { UserInformation, UserPermissionsConfig } from '../models';
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
  getUserInformation$ = this.actions$
    .ofType(usersActions.GET_USER_INFORMATION)
    .pipe(
      map((action: any) => action.payload),
      switchMap((payload: string) => {
        return this.userService.getUserInformation(payload).pipe(
          map((data: UserInformation) => {
            if (data) {
              return new usersActions.GetUserInformationSuccess(data);
            }
            return new usersActions.GetUserInformationFailed();
          })
        );
      })
    );

  @Effect({ dispatch: false })
  getUserInformationFailed$ = this.actions$
    .ofType(usersActions.GET_USER_INFORMATION_FAILED)
    .pipe(
      map((action: any) => action.payload),
      map((payload) => {
        console.error(payload);
      }),
    );

  @Effect()
  updateUserInformation$ = this.actions$
    .ofType(usersActions.UPDATE_USER_INFORMATION)
    .pipe(
      map((action: any) => action.payload),
      switchMap((payload: UserInformation) => {
        return this.userService.updateUserInformation(payload).pipe(
          switchMap(() => {
            return this.userService.updateUserPermissions(payload.id, payload.permissions);
          }),
          map((data: UserInformation) => {
            return new usersActions.UpdateUserInformationSuccess();
          })
        );
      })
    );

  @Effect({ dispatch: false })
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

  @Effect()
  updateUserPermissions$ = this.actions$
    .ofType(usersActions.UPDATE_USER_PERMISSIONS)
    .pipe(
      map((action: any) => action.payload),
      switchMap((payload: { permissions: UserPermissionsConfig[], userId: string }) => {
        return this.userService.updateUserPermissions(payload.userId, payload.permissions).pipe(
          map(() => {
            return new usersActions.UpdateUserPermissionsSuccess();
          })
        );
      })
    );

  @Effect({ dispatch: false })
  updateUserPermissionSuccess$ = this.actions$
    .ofType(usersActions.UPDATE_USER_PERMISSIONS_SUCCESS)
    .pipe(
      map((action: any) => action.payload),
      tap(data => {
        this.zone.run(() => {
          this.toastr.success('You have updated your profile', '¡Good Job!');
        });
      })
    );

  @Effect()
  getUsersSuccess$ = this.actions$
    .ofType(usersActions.FILTER_USERS)
    .pipe(
      map((action: any) => action.payload),
      switchMap((query) => {
        console.log('Payload', query);
        return this.userService.filterUsers(query);
      }),
      delay(2000),
      map((response: any) => new usersActions.FilterUsersSuccess(response)),
      catchError((error) => {
        return [new usersActions.FilterUsersFailed(error)];
      })
    );

  @Effect({ dispatch: false })
  getUsersFailed$ = this.actions$
    .ofType(usersActions.FILTER_USERS_FAILED)
    .pipe(
      map((action: any) => action.payload),
      tap((response: any) => {
        this.zone.run(() => {
          this.toastr.error('An error occurred trying to get users', '¡Error!');
        });
      })
    );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private zone: NgZone,
    private toastr: ToastrService
  ) { }
}
