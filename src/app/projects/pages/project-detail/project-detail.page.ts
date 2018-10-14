import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { GetProject } from '../../actions/projects.action';
import { Observable } from 'rxjs';
import { IProject } from '../../models';
import { getProjectSelected } from '../../reducers/projects.reducer';

@Component({
  selector: 'page-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss']
})
export class ProjectDetailPage implements OnInit {

  private projectId;

  public project$: Observable<IProject>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{}>
  ) { }

  ngOnInit() {
    this.getParams();
  }

  public getParams() {
    this.route.params.subscribe((params) => {
      console.warn(params);
      this.projectId = params['id'];
      if (this.projectId) {
        this.getProject();
      } else {
        // SEND TO ERRROR PAGE
      }
    });
  }

  public getProject() {
    this.store.dispatch(new GetProject(this.projectId));
    this.project$ = this.store.select(getProjectSelected);
  }

}
