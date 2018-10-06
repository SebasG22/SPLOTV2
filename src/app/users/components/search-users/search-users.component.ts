import { Component, OnInit, Input, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, timer, Subscription } from 'rxjs';
import { getLoadingData, getUsersList } from '../../reducers/users.reducer';
import { MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef } from '@angular/material';
import { FilterUsers } from '../../actions/users.actions';
import { UserInformation } from '../../models';
import { findIndex, forEach, cloneDeep } from 'lodash';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {

  public placeholder: string;

  public form: FormGroup;

  public loadingData$: Observable<boolean>;

  public usersList$: Subscription;

  public; userList: UserInformation[] = [];

  public usersSelected: UserInformation[] = [];

  constructor(
    private store: Store<{}>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<SearchUsersComponent>
  ) { }

  ngOnInit() {
    this.listenLoadData();
    this.listenUserList();
    this.patchDefaultData();
    this.buildForm();
  }

  private patchDefaultData() {
    this.placeholder = this.data.placeholder || 'Search users';
  }

  public listenLoadData() {
    this.loadingData$ = this.store.select(getLoadingData);
  }

  public listenUserList() {
    this.usersList$ = this.store.select(getUsersList).subscribe((users) => {
      if (users) {
        this.userList = users;
      }
    });
  }


  public isUserSelected(userInfo) {
    const userIndex = findIndex(this.usersSelected, (user) => user.id === userInfo.id);

    return userIndex > -1 ? true : false;
  }

  private buildForm() {
    this.form = this.fb.group({
      search: ['', Validators.required],
      searchBy: ['name'],
      page: ['1', Validators.required]
    });
  }

  public toggleUser(user: UserInformation, event: MatCheckboxChange) {
    console.log('checked', event.checked);
    // Checked
    if (event.checked) {
      return this.usersSelected.push(
        user
      );
    }
    // UnChecked
    this.usersSelected.splice(findIndex(this.usersSelected, (userSelected) => userSelected.id === user.id), 1);
    console.log(this.usersSelected);
  }

  public userIsSelected(user) {
    return findIndex(this.usersSelected, (userSelected) => userSelected.id === user.id) > -1;
  }

  public onSubmitForm({ value, valid }: { value: any, valid: any }) {
    if (valid) {
      this.store.dispatch(new FilterUsers(value));
    }
  }

  public closeModal() {
    this.dialogRef.close({ selected: this.usersSelected });
  }

}
