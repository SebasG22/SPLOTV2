import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SET_ERROR_SPLOT } from '../actions/error.actions';
import { map } from 'rxjs/operators';
import { OnGoToPageSplot } from '../actions/router.actions';

@Injectable()
export class ErrorSplotEffect {

    @Effect({ dispatch: true })
    onGoToPageSplot$ = this.actions$.ofType(
        SET_ERROR_SPLOT
    ).pipe(
        map(() => {
            return new OnGoToPageSplot({ path: ['/error'] });
        }));

    constructor(
        private actions$: Actions,
    ) { }

}
