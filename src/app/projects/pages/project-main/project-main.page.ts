import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListProjects } from '../../components/actions/projects.action';
import { Observable } from 'rxjs';
import { IProject } from '../../models';
import { getProjects } from '../../components/reducers/projects.reducer';

@Component({
  selector: 'page-project-main',
  templateUrl: './project-main.page.html',
  styleUrls: ['./project-main.page.scss']
})
export class ProjectMainPage implements OnInit {

  public projects$: Observable<IProject[]>;
  constructor(
    private store: Store<{}>
  ) { }

  ngOnInit() {
    this.listProjects();
  }

  public listProjects() {
    this.store.dispatch(new ListProjects());
    this.projects$ = this.store.select(getProjects);
  }
}
