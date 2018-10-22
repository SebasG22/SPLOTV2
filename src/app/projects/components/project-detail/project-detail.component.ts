import { Component, OnInit, Input } from '@angular/core';
import { IProject } from '../../models';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @Input()
  public project: IProject;

  constructor() { }

  ngOnInit() {
  }

  public goBack() {

  }

}
