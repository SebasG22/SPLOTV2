import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserConfiguration } from '../../models/configuration-process.model';
import { Store } from '@ngrx/store';
import { getUserConfiguration, getLoader } from '../../reducers/configuration-process.reducer';
import { GetChildrenByLevel } from '../../actions/configuration-process.actions';

@Component({
  selector: 'page-user-model-configuration',
  templateUrl: './user-model-configuration.page.html',
  styleUrls: ['./user-model-configuration.page.scss']
})
export class UserModelConfigurationPage implements OnInit {

  private projectId: string;
  private stepIndex: number;
  public userConfiguration$: Observable<IUserConfiguration>;
  public loadingData$: Observable<boolean>;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<{}>
  ) { }

  ngOnInit() {
    this.listenParams();
    this.listenConfiguration();
    this.getUserConfiguration();
  }

  private listenParams() {
    this.activateRoute.params.subscribe((params) => {
      this.projectId = params['id'];
    });
    this.activateRoute.queryParams.subscribe((queryParams) => {
      this.stepIndex = +queryParams['step'] || 0;
    });
  }

  private listenConfiguration() {
    this.loadingData$ = this.store.select(getLoader);
    this.userConfiguration$ = this.store.select(getUserConfiguration);
  }

  private getUserConfiguration() {
    this.store.dispatch(new GetChildrenByLevel({ projectId: this.projectId, stepIndex: this.stepIndex }));
  }

}
