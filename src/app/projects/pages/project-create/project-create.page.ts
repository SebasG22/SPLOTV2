import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IConfigurationModel } from 'src/app/configuration-process/models/configuration-process.model';
import { Observable } from 'rxjs';
import { getConfigurationModelsInformation } from 'src/app/configuration-process/reducers/configuration-process.reducer';
import { GetConfigurationModels } from 'src/app/configuration-process/actions/configuration-process.actions';

@Component({
  selector: 'page-project-create',
  templateUrl: './project-create.page.html',
  styleUrls: ['./project-create.page.scss']
})
export class ProjectCreatePage implements OnInit {

  public configurationsModels$: Observable<IConfigurationModel[]>;
  constructor(
    private store: Store<{}>
  ) { }

  ngOnInit() {
    this.getConfigurationModelsInformation();
  }

  public getConfigurationModelsInformation() {
    this.store.dispatch(new GetConfigurationModels());
    this.configurationsModels$ = this.store.select(getConfigurationModelsInformation);
  }

}
