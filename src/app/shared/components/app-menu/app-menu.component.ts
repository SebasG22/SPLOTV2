import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Store } from '@ngrx/store';
import * as authActions from '../../../auth/actions/auth.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  constructor(
    private appService: AppService,
    private store: Store<{}>
  ) { }

  ngOnInit() {
  }

  public onOpenMenu() {
    this.appService.open();
  }

  public logout() {
    this.store.dispatch( new authActions.Logout);
  }

}
