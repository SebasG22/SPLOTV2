import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public menuIsOpen: Observable<boolean>;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.listenMenuOpen();
      this.appService.registerServiceWorker();
  }

  public listenMenuOpen() {
    this.menuIsOpen = this.appService.menu$;
  }

  public onClose() {
this.appService.close();
  }
}
