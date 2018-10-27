import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUsersList } from '../../reducers/users.reducer';
import { GetUsersInformation } from '../../actions/users.actions';

@Component({
  selector: 'page-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss']
})
export class UserListPage implements OnInit {

  public users$: Observable<any>;

  constructor(
    private store: Store<{}>
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    console.log('Disparando acción');
    this.users$ = this.store.select(getUsersList);
    this.store.dispatch(new GetUsersInformation());
  }

}
