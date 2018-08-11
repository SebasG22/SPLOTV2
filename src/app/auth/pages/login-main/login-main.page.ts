import { Component, OnInit } from '@angular/core';
import { ProjectContributors } from '../../config';

@Component({
  selector: 'page-login-main',
  templateUrl: 'login-main.page.html',
  styleUrls: ['login-main.page.scss']
})
export class LoginMainPage implements OnInit {
  constructor() {}

  public showEmail = false;

  public contributors = ProjectContributors;

  ngOnInit() {}

}
