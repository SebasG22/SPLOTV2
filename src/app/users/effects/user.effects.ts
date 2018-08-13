import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as usersActions from '../../users/actions/users.actions';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
    @Effect({ dispatch: false })
  getUserInformation$ = this.actions$.ofType(usersActions.GET_USER_INFORMATION).pipe(
    map((action: any) => action.payload),
    tap(() => console.log('Called'))
    );


  constructor(
    private actions$: Actions,
  ) {}

}
