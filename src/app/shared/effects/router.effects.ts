import { Injectable, NgZone } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { ON_GO, OnGo } from '../actions/router.actions';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RouterEffects {

    @Effect({ dispatch: false })
    onGoTo$ = this.actions$.ofType(
        ON_GO
    ).pipe(
        map((action: OnGo) => action.payload),
        map((payload) => {
            const { path, queryParams } = payload;
            // this.zone.run(() => {
            this.router.navigate(path, { queryParams });
            // });
        }));

    constructor(
        private actions$: Actions,
        private router: Router,
        private zone: NgZone
    ) { }
}



