import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GetUserInformation } from '../../actions/users.actions';

@Component({
  selector: 'page-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss']
})
export class UserDetailPage implements OnInit {

  private paramsSubscription: Subscription;
  private userId: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store <{}>
  ) { }


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
