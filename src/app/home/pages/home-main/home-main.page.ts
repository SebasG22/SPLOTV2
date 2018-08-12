import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'page-home-main',
  templateUrl: './home-main.page.html',
  styleUrls: ['./home-main.page.scss']
})
export class HomeMainPage implements OnInit {

  @Output() public openMenu = new EventEmitter<any>();

  constructor(
    public appService: AppService
  ) { }

  ngOnInit() {
  }

  public onOpenMenu() {
    this.appService.open();
  }

}
