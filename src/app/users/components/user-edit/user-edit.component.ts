import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInformation } from '../../models';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnChanges {

  private form: FormGroup;

  @Input()user: UserInformation;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes.user) {
        this.patchForm();
      }
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      identification: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      telephone: [null, Validators.compose([Validators.required])],
      company: [null, Validators.compose([Validators.required])],
      position: [null, Validators.compose([Validators.required])],
    });
  }

  private patchForm() {
    this.form.patchValue(this.user);
  }

  public onSubmitForm( {valid, value }: { valid: boolean, value: any}) {
    if (valid) {

    }
  }

}
