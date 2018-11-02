import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserConfiguration } from '../../models/configuration-process.model';
import { Store } from '@ngrx/store';
import { getUserConfiguration, getLoader } from '../../reducers/configuration-process.reducer';

@Component({
  selector: 'page-user-model-configuration',
  templateUrl: './user-model-configuration.page.html',
  styleUrls: ['./user-model-configuration.page.scss']
})
export class UserModelConfigurationPage implements OnInit {

  private projectId: string;
  private stepIndex: number;
  private userConfiguration$: Observable<IUserConfiguration>;
  private loadingData$: Observable<boolean>;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<{}>
  ) { }

  ngOnInit() {
    this.listenParams();
    this.listenConfiguration();
  }

  private listenParams() {
    this.activateRoute.params.subscribe((params) => {
      this.projectId = params[this.projectId];
    });
    this.activateRoute.queryParams.subscribe((queryParams) => {
      this.stepIndex = +queryParams['step'];
    });
  }

  private listenConfiguration() {
    this.loadingData$ = this.store.select(getLoader);
    this.userConfiguration$ = this.store.select(getUserConfiguration);
  }

  private getUserConfiguration() {

  }

}
