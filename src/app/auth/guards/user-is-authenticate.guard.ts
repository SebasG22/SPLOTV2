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
import { tap, skipWhile, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { VerifyAuthComponent } from '../components/verify-auth/verify-auth.component';
import { getAuthVerifyState } from '../reducers/auth.reducer';

@Injectable()
export class UserIsAuthenticate implements CanActivate, CanActivateChild {
  constructor(
    private store: Store<{}>,
    private dialog: MatDialog,
    private router: Router
  ) {}

  private dialogRef;

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
    return this.store.select(getAuthVerifyState).pipe(
      tap(stateData => {
        if (this.dialogRef === undefined) {
          this.dialogRef = this.dialog.open(VerifyAuthComponent, {
            width: '90%'
          });
        }
        return stateData;
      }),
      skipWhile(verifyState => verifyState === false),
      map(verifyState => {
        if (verifyState === 'Logged') {
          this.dialogRef.close();
          // this.router.navigate(['/home']);
          return true;
        }
        this.dialogRef.close();
        // TO FIX: AL PARECER SI SE RETORNA SOLO FALSE, LA PÁGINA QUEDA EN BLANCO
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
