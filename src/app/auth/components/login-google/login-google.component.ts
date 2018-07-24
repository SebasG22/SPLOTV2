import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActions from '../../actions/auth.actions';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent implements OnInit {

  constructor(private store: Store <{}>) { }

  ngOnInit() {
  }

  public onSignIn() {
    this.store.dispatch(new authActions.LoginWithGoogle);
  }


}
