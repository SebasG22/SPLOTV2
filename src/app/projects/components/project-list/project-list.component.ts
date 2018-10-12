import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProject } from '../../models';
import { Observable } from 'rxjs';
import { ListProjects } from '../actions/projects.action';
import { getProjects } from '../reducers/projects.reducer';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input() public projects: IProject[];

  public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  constructor() { }

  ngOnInit() {
  }

}
