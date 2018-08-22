import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Store } from '@ngrx/store';
import * as authActions from '../../../auth/actions/auth.actions';
import { UserInformation } from '../../../users/models';
import { Observable } from 'rxjs';
import { getCurrentUserInformation } from '../../../users/reducers/users.reducer';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  public currentUser$: Observable <UserInformation>;

  constructor(
    private appService: AppService,
    private store: Store<{}>
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  public getCurrentUser() {
    this.currentUser$ = this.store.select(getCurrentUserInformation);
  }

  public onOpenMenu() {
    this.appService.open();
  }

  public logout() {
    this.store.dispatch( new authActions.Logout);
  }

}
