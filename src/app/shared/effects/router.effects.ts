import { Injectable, NgZone } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { ON_GO_TO_PAGE_SPLOT } from '../actions/router.actions';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { has } from 'lodash';

@Injectable()
export class RouterEffects {

    // Only on path will only navigate if the route match
    @Effect({ dispatch: false })
    onGoToPageSplot$ = this.actions$.ofType(
        ON_GO_TO_PAGE_SPLOT
    ).pipe(
        map((action: any) => action.payload),
        map((payload) => {
            const { path, queryParams, onlyOnPath } = payload;
            console.warn('Estoy navegando', has(onlyOnPath));

            if (onlyOnPath) {
                if (this.router.url === onlyOnPath) {
                    console.warn('Estoy navegando');
                    this.zone.run(() => {
                        this.router.navigate(path, { queryParams });
                    });
                }
            }
        }));

    constructor(
        private actions$: Actions,
        private router: Router,
        private zone: NgZone
    ) { }
}



