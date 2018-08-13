import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  public onOpenMenu() {
    this.appService.open();
  }

}
