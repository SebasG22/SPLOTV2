import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as appActions from '../app/app.actions';
import { map, switchMap, withLatestFrom, takeUntil, takeWhile } from 'rxjs/operators';
import { AppService } from './app.service';
import { Observable, defer, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { getAuthUserIsLogged } from './auth/reducers/auth.reducer';

@Injectable()
export class AppEffects {

  @Effect({ dispatch: true })
  getAppPermissions$ = this.actions$.ofType(appActions.GET_APP_PERMISSIONS).pipe(
    switchMap((userIsLogged) => {
      return this.appService.getAppPermissions()
        .pipe(
          map(permissions => {
            return new appActions.GetAppPermisionsSuccess(permissions);
          })
        );
    })
  );


  constructor(
    private actions$: Actions,
    private appService: AppService
  ) { }

}
