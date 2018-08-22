import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { UserInformation, UserPermissionsConfig } from '../../models';
import { Location } from '@angular/common';
import { forEach } from 'lodash';
import { Store } from '@ngrx/store';
import { UpdateUserInformation } from '../../actions/users.actions';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { getSelectedUserInformation } from '../../reducers/users.reducer';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  public userInformation$: Subscription;
  public userInformation: UserInformation;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private store: Store<{}>,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUserInformation();
  }

  public getUserInformation() {
    this.userInformation$ = this.store
      .select(getSelectedUserInformation)
      .subscribe((userInformation: UserInformation) => {
        if (userInformation) {
          this.userInformation = userInformation;
          this.buildForm();
          this.patchForm();
          this.cleanPermissionForm();
          this.generatePermissionForm();
        }
      });
  }


  private buildForm() {
    this.form = this.fb.group({
      id: [null, Validators.compose([Validators.required])],
      photo: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      identification: [null, Validators.compose([Validators.required])],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      telephone: [null, Validators.compose([Validators.required])],
      permissions: this.fb.array([]),
      company: [null, Validators.compose([Validators.required])],
      position: [null, Validators.compose([Validators.required])]
    });
    this.form.get('email').disable({ onlySelf: true });
  }

  public generatePermissionForm() {
    forEach(
      this.userInformation.permissions,
      (permission: UserPermissionsConfig) => {
        this.addPermission(permission);
      }
    );
  }

  public cleanPermissionForm() {
    const permissions = this.form.get('permissions') as FormArray;
    permissions.reset();
  }

  public generatePermissionControl(userPermissions: UserPermissionsConfig) {
    return this.fb.group({
      id: userPermissions.id,
      name: userPermissions.name,
      enabled: userPermissions.enabled
    });
  }

  get formPermissions() {
    return <FormArray>this.form.get('permissions');
  }

  public addPermission(userPermissions: UserPermissionsConfig) {
    const permissions = this.formPermissions;
    permissions.push(this.generatePermissionControl(userPermissions));
  }

  private patchForm() {
    this.form.patchValue(this.userInformation);
  }

  public onSubmitForm({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.store.dispatch(new UpdateUserInformation(value));
      return this.location.back();
    }
    return this.toastr.error('The data is invalid', '¡Error!');
  }

  public goBack() {
    if (this.location) {
      this.location.back();
    }
  }

    ngOnDestroy(): void {
      if (this.userInformation$) { this.userInformation$.unsubscribe(); }
    }

}
