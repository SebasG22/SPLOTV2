import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IErrorMessage } from '../../models/error.model';
import { Observable } from 'rxjs';
import { getErrorMessage } from '../../reducers/error.reducer';

@Component({
  selector: 'page-error',
  templateUrl: './error-splot.page.html',
  styleUrls: ['./error-splot.page.scss']
})
export class ErrorSplotPage implements OnInit {

  public errorMessage: Observable<IErrorMessage>;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.getErrorInformation();
  }

  public getErrorInformation() {
    this.errorMessage = this.store.select(getErrorMessage);
  }

}
