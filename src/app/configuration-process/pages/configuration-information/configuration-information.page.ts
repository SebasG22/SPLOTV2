import { Component, OnInit } from '@angular/core';
import { RouterState, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-configuration-information',
  templateUrl: './configuration-information.page.html',
  styleUrls: ['./configuration-information.page.scss']
})
export class ConfigurationInformationPage implements OnInit {

  public projectId: string;
  constructor(
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listenParams();
  }

  public listenParams() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.projectId = params['id'];
    });
  }

  public goBack() {

  }

}
