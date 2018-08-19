import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInformation } from '../../models';
import { Observable } from 'rxjs';
import { getCurrentUserInformation } from '../../reducers/users.reducer';

@Component({
  selector: 'page-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss']
})
export class UserEditPage implements OnInit {

  public userInformation$: Observable<UserInformation>;

  constructor(
    private store: Store <{}>
  ) { }

  ngOnInit() {
    this.getUserInformation();
  }

  public getUserInformation() {
    this.userInformation$ = this.store.select(getCurrentUserInformation);
  }

}
