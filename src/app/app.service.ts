import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { environment } from '../environments/environment';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { AppPermissions } from './users/models';

@Injectable()
export class AppService {

  public openMenu = new Subject();

  constructor(
    private snackBar: MatSnackBar,
    private afs: AngularFirestore
  ) {
    this.registerServiceWorker();
  }

  public get menu$(): Observable<any> {
    return this.openMenu.asObservable();
  }

  public open() {
    this.openMenu.next(true);
  }

  public close() {
    this.openMenu.next(false);
  }

  public registerServiceWorker() {
    if (environment.production) {
      if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .register(environment.swPath)
            .then(reg => {
              const installing = reg.installing;
              if (!navigator.serviceWorker.controller) {
                return;
              }
              if (reg.waiting) {
                this.updateReady(reg.waiting);
              }
              if (reg.installing) {
                this.updateReady(reg.installing);
                return;
              }
              reg.addEventListener('updatefound', () => {
                console.log('Actualización encontrada');
                this.updateReady(reg.installing);
              });

              // reg was successful
              console.log(
                'ServiceWorker reg successful with scope: ',
                reg.scope
              );
            })
            .catch(function(err) {
              // reg failed :(
              console.log('ServiceWorker reg failed: ', err);
            });
          return;
      }
    }
  }

  private updateReady(worker) {
    if (worker.state === 'installed') {
      console.log('Nueva versión disponible');
      this.showUpdateToast(worker);
    }
    worker.addEventListener('statechange', () => {
      console.log('Escuchando cambios');
      switch (worker.state) {
        case 'installed':
          console.log('Nueva versión disponible');
          this.showUpdateToast(worker);
      }
    });
  }

  private showUpdateToast(worker: Worker) {
    const snackBarRef = this.snackBar.open('New Update', 'Get it');
    snackBarRef.afterOpened().subscribe(() => {
      worker.postMessage({ action: 'skipWaiting' });
    });
  }

  public getAppPermissions(): Observable<AppPermissions[]> {
    return from(this.afs.collection<AppPermissions>('permissions_keys').valueChanges());
  }

}
