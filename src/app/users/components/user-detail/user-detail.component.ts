import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserInformation } from '../../models';
import { getSelectedUserInformation } from '../../reducers/users.reducer';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public userInformation$: Observable<UserInformation>;

  constructor(private store: Store<{}>) { }

  ngOnInit() {
    this.getUserInformation();
  }

  public getUserInformation() {
     this.userInformation$ = this.store.select(getSelectedUserInformation);
  }

}
