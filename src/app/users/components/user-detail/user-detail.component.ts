import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserInformation } from '../../models';
import { getCurrentUser } from '../../reducers/users.reducer';

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

  getUserInformation() {
     this.userInformation$ = this.store.select(getCurrentUser);
  }

}
