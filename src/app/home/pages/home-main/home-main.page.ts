import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppService } from '../../../app.service';
import { Observable } from 'rxjs';
import { UserInformation } from '../../../users/models';
import { Store } from '@ngrx/store';
import { getCurrentUser } from '../../../users/reducers/users.reducer';

@Component({
  selector: 'page-home-main',
  templateUrl: './home-main.page.html',
  styleUrls: ['./home-main.page.scss']
})
export class HomeMainPage implements OnInit {

  constructor(
    public appService: AppService,
    private store: Store<{}>
  ) { }

  public userInformation$: Observable<UserInformation>;

  ngOnInit() {
      this.getUserInformation();
  }

  getUserInformation() {
    this.userInformation$ = this.store.select(getCurrentUser);
 }

}
