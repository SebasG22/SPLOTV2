import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, withLatestFrom, delay, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { getAuthWasSessionChecked, getAuthUserIsLogged } from '../reducers/auth.reducer';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { OnGoToPageSplot } from 'src/app/shared/actions/router.actions';
import { SetErrorSplot } from 'src/app/shared/actions/error.actions';

@Injectable()
export class UserIsAuthenticate implements CanActivate, CanActivateChild {
  constructor(
    private store: Store<{}>,
    private loaderService: LoaderService
  ) { }


  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivateChild(route, state);
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(getAuthWasSessionChecked)
      .pipe(
        map((authSessionWasChecked) => {
          if (!this.loaderService.loader) {
            this.loaderService.showLoader('Checking Session');
          }
          return authSessionWasChecked;
        }),
        filter((item) => item === true),
        withLatestFrom(this.store.select(getAuthUserIsLogged)),
        map(([authWasSessionChecked, authUserIsLogged]) => {
          console.log('authUserIsLogged', authUserIsLogged);
          setTimeout(() => {
            // tslint:disable-next-line:no-unused-expression
            if (!authUserIsLogged) {
              this.store.dispatch(new SetErrorSplot({ title: 'User not authorized', message: ' User is not logged' }));
            }
            this.loaderService.dismissLoader(0);
          }, 1000);

          return authUserIsLogged;
        }),

      );
  }
}
