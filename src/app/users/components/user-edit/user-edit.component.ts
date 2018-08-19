import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserInformation, UserPermissionsConfig } from '../../models';
import { Location } from '@angular/common';
import { forEach } from 'lodash';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnChanges {

  public form: FormGroup;

  @Input()userInformation: UserInformation;

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    this.buildForm();
    this.patchForm();
    this.generatePermissionForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (this.userInformation && this.form) {
        this.patchForm();
        this.cleanPermissionForm();
        this.generatePermissionForm();
      }
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [null, Validators.compose([Validators.required])],
      photo: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      identification: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      telephone: [null, Validators.compose([Validators.required])],
      permissions: this.fb.array([]),
      company: [null, Validators.compose([Validators.required])],
      position: [null, Validators.compose([Validators.required])],
    });
    this.form.get('email').disable({onlySelf: true});
  }

  public generatePermissionForm() {
    forEach(this.userInformation.permissions, (permission: UserPermissionsConfig) => {
        this.addPermission(permission);
    });
  }

  public cleanPermissionForm() {
    const permissions = this.form.get('permissions') as FormArray;
    permissions.reset();
  }

  public generatePermissionControl(userPermissions: UserPermissionsConfig) {
    return this.fb.group({
      'id': userPermissions.id,
      'name': userPermissions.name,
      'enabled': userPermissions.enabled
    });

  }

  public addPermission(userPermissions: UserPermissionsConfig) {
    const permissions = this.form.get('permissions') as FormArray;
    permissions.push(this.generatePermissionControl(userPermissions));
  }

  private patchForm() {
    this.form.patchValue(this.userInformation);
  }

  public onSubmitForm( {valid, value }: { valid: boolean, value: any}) {
    if (valid) {

    }
  }


  public goBack() {
    this.location.back();
  }

}
