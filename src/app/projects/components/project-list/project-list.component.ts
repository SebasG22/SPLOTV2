import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProject } from '../../models';
import { Observable } from 'rxjs';
import { GetProjects } from '../actions/projects.action';
import { getProjects } from '../reducers/projects.reducer';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {


  public projects$: Observable<IProject[]>;
  constructor(
    private store: Store<{}>
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  public getProjects() {
    this.store.dispatch(new GetProjects());
    this.projects$ = this.store.select(getProjects);
  }

}
