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
import { map, withLatestFrom, delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { getAuthWasSessionChecked, getAuthUserIsLogged } from '../reducers/auth.reducer';
import { LoaderService } from 'src/app/shared/services/loader.service';

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
        }),
        withLatestFrom(this.store.select(getAuthUserIsLogged)),
        delay(3000),
        map(([authWasSessionChecked, authUserIsLogged]) => {
          setTimeout(() => {
            console.log('setTimeout');
            // tslint:disable-next-line:no-unused-expression
            this.loaderService.dismissLoader(2000);
          }, 2000);
          return authUserIsLogged;
        }),

      );
  }
}
