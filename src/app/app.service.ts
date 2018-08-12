import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class AppService {
  public openMenu = new Subject();

  public get menu$(): Observable<any> {
    return this.openMenu.asObservable();
  }

  public open() {
    this.openMenu.next(true);
  }

  public close() {
    this.openMenu.next(false);
  }
}
