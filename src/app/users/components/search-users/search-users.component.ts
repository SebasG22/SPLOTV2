import { Component, OnInit, Input, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { getLoadingData } from '../../reducers/users.reducer';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  public placeholder: string;

  private form: FormGroup;

  public loading_data$: Observable<boolean>;

  constructor(
    private store: Store<{}>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.listenLoadData();
    this.buildForm();
  }

  private patchDefaultData() {
    this.placeholder = this.data.placeholder || 'Search users';
  }

  public listenLoadData() {
    this.loading_data$ = this.store.select(getLoadingData);
  }

  private buildForm() {
    this.form = this.fb.group({
      search: ['', Validators.required],
      searchBy: [''],
      page: ['1', Validators.required]
    });
  }

  public onSubmitForm({ value, valid }: { value: any, valid: any }) {
    console.log();
  }

}
