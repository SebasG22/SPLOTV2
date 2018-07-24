import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActions from '../../actions/auth.actions';

@Component({
  selector: 'app-login-github',
  templateUrl: './login-github.component.html',
  styleUrls: ['./login-github.component.scss']
})
export class LoginGithubComponent implements OnInit {

  constructor(private store: Store<{}>) { }

  ngOnInit() {
  }

  public onSignIn() {
    this.store.dispatch(new authActions.LoginWithGithub);
  }

}
