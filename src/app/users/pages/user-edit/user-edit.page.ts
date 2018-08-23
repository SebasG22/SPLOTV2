import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInformation } from '../../models';
import { Observable, Subscription } from 'rxjs';
import { getCurrentUserInformation } from '../../reducers/users.reducer';
import { ActivatedRoute } from '@angular/router';
import { GetUserInformation } from '../../actions/users.actions';

@Component({
  selector: 'page-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss']
})
export class UserEditPage implements OnInit {
  private paramsSubscription: Subscription;
  private userId: string;

  constructor(private route: ActivatedRoute, private store: Store<{}>) {}

  ngOnInit() {
    this.getUserId();
  }

  public getUserId() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.store.dispatch(new GetUserInformation(this.userId));
    });
  }
}
