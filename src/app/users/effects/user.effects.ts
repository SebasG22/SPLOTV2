import { Injectable, NgZone } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as usersActions from '../actions/users.actions';
import { map, tap, switchMap, catchError, delay, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { UserInformation, UserPermissionsConfig } from '../models';
import { UserProvider } from '../../auth/models';
import { ToastrService } from 'ngx-toastr';
import { isEmpty } from 'lodash';
import { OnGoToPageSplot } from 'src/app/shared/actions/router.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginSuccess } from 'src/app/auth/actions/auth.actions';
import { User } from 'firebase';
import { from, of } from 'rxjs';
import { GET_USERS_INFORMATION, GetUsersInformationSuccess } from '../actions/users.actions';
@Injectable()
export class UserEffects {
  @Effect({ dispatch: true })
  checkUserRegistrationSplot$ = this.actions$
    .ofType(usersActions.CHECK_USER_REGISTRATION)
    .pipe(
      map((action: any) => action.payload),
      switchMap((payload: User) => {
        return this.userService.getUserInformation(payload.uid).pipe(
          map((data: UserInformation) => {
            console.warn('Check User Registration', data);
            // Check user exists on firestore node
            if (!isEmpty(data)) {
              return new usersActions.CheckUserRegistrationSuccess(data);
            }
            // Must register user
            return new usersActions.RegisterUser({
              id: payload.uid,
              name: payload.displayName,
              email: payload.email,
              photo: payload.photoURL
            });
          })
        );
      })
    );

  @Effect()
  checkUserRegistrationSuccess$ = this.actions$
    .ofType(usersActions.CHECK_USER_REGISTRATION_SUCCESS)
    .pipe(
      mergeMap(() => {
        return [
          new LoginSuccess(),
        ];
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
  registerUserSuccess$ = this.actions$
    .ofType(usersActions.REGISTER_USER_SUCCESS)
    .pipe(
      map(() => {
        return new LoginSuccess();
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
      catchError((error) => [new usersActions.FilterUsersFailed(error)])
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

  @Effect()
  getUsersInformationByIds$ = this.actions$
    .ofType(usersActions.GET_USERS_INFORMATION_BY_IDS)
    .pipe(
      map((action: any) => action.payload),
      tap(console.warn),
      switchMap((payload) => this.userService.getUsersInformationByIds(payload)),
      map((response) => new usersActions.GetUsersInformationByIdsSuccess(response)),
      catchError((error) => [new usersActions.GetUsersInformationByIdsFailed(error)])
    );

  @Effect({ dispatch: false })
  getUsersInformationByIdsFailed$ = this.actions$
    .ofType(usersActions.GET_USERS_INFORMATION_BY_IDS_FAILED)
    .pipe(
      map((action: any) => {
        this.zone.run(() => {
          this.toastr.error('An error occurred trying to get users information by ids', '¡Error!');
        });
        console.error(action.payload);
      })
    );

  @Effect()
  getUsers$ = this.actions$.ofType((
    GET_USERS_INFORMATION
  )).pipe(
    switchMap(() => {
      return this.userService.getUsersInformation();
    }),
    map((usersInfo) => {
      return new GetUsersInformationSuccess(usersInfo);
    })
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private zone: NgZone,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<{}>
  ) { }
}
