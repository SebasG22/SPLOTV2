import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActions from '../../actions/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserEmail } from '../../models';
@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {

  public form: FormGroup;

  public showEmail = false;

  @Output() showEmailChange: EventEmitter<boolean>  = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private store: Store<{}>) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public onSignIn({ valid, value}: { valid: boolean, value: UserEmail}) {
    this.store.dispatch(new authActions.LoginWithEmail(value));
  }

  public showOrHideEmail() {
    this.showEmail = !this.showEmail;
    this.showEmailChange.emit(this.showEmail);
  }

}
