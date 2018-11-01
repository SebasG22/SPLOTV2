import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserProvider } from '../../auth/models';
import { from, combineLatest, of, observable } from 'rxjs';
import {
  UserInformation,
  AppPermissions,
  UserPermissionsConfig
} from '../models';
import * as firebase from 'firebase';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { isEmpty, forEach, findIndex, filter } from 'lodash';
import * as appSelectors from '../../app.reducer';
import { Store } from '@ngrx/store';
import { FirebaseServiceAbstract } from 'src/app/shared/abstracts/firebase-service.abstract';
@Injectable()
export class UserService extends FirebaseServiceAbstract {

  constructor(private afs: AngularFirestore, private store: Store<{}>) {
    super(afs);
   }

  public getUserInformation(userId: string) {
    console.warn('Get User Information', userId);
    return this.afs
      .collection('users')
      .doc(userId)
      .valueChanges()
      .pipe(
        switchMap(userData => {
          return this.afs
            .collection('users')
            .doc(userId)
            .collection('permissions')
            .valueChanges()
            .pipe(
              withLatestFrom(this.store.select(appSelectors.getAppPermissions)),
              map(([userPermissions, appPermissions]: [UserPermissionsConfig[], AppPermissions[]]) => {
                if (!isEmpty(userPermissions)) {
                  return { ...userData, permissions: this.mergeAppUserPermission(userPermissions, appPermissions) };
                }
                return {};
              })
            );
        })
      );
  }

  public mergeAppUserPermission(
    userPermissions: UserPermissionsConfig[],
    appPermissions: AppPermissions[]
  ) {
    const userPermissionsMapped = [];
    forEach(appPermissions, appPermission => {
      const permission = findIndex(
        userPermissions,
        userPermission => userPermission.id === appPermission.id
      );
      if (permission > -1) {
        const obj = userPermissions[permission];
        return userPermissionsMapped.push({
          name: appPermission.name,
          ...obj,
        });
      }
      return userPermissionsMapped.push({
        ...appPermission,
        enabled: false
      });
    });
    console.warn('userPermissionsMapped', userPermissionsMapped);
    return userPermissionsMapped;
  }

  public registerUserInformation(basicInfo: UserProvider) {
    return from(
      this.afs
        .collection('users')
        .doc(basicInfo.id)
        .set(basicInfo)
    ).pipe(
      switchMap(() => {
        return this.afs
          .collection('users')
          .doc(basicInfo.id)
          .collection('permissions')
          .doc('USER_CONFIGURATOR')
          .set({
            id: 'USER_CONFIGURATOR',
            enabled: true
          });
      })
    );
  }

  public updateUserInformation(userInformation: UserInformation) {
    return from(
      this.afs
        .collection('users')
        .doc(userInformation.id)
        .update(userInformation)
    );
  }

  public updateUserPermissions(userId: string, userPermissions: UserPermissionsConfig[]) {
    const obs = [];
    forEach((permision) => {
      obs.push(this.updateUserPermissionById(userId, permision));
    });
    return combineLatest(obs);
  }

  public updateUserPermissionById(userId: string, userPermission: UserPermissionsConfig) {
    return from(
      this.afs.collection('users')
        .doc(userId)
        .collection('permissions')
        .doc(userPermission.id)
        .set(userPermission));
  }

  public addUserHistory(userId: string, message: string) {
    const id = this.afs.createId();
    return this.afs
      .collection('users')
      .doc(userId)
      .collection('histories')
      .doc(id)
      .set({
        id: id,
        action: message,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        created_by: userId
      });
  }

  public getUsersInformationByIds(participantsIds: any[]) {
    const obs = [];
    forEach(participantsIds, item => {
      obs.push(this.getUserInformation(item));
    });
    return (obs.length === 0) ? of([]) : combineLatest(obs);
  }

  public filterUsers(query: { search: string, searchBy: string, page: number }) {
    return this.afs.collection('users').valueChanges().pipe(
      map((data) => {
        console.log('data', data);
        return filter(data, item => {
          return item[`${query.searchBy}`].toLowerCase().includes(query.search.toLowerCase());
        });
      })
    );
  }

  /**
   * Get all the users
   */
  public getUsersInformation() {
    return this.getCollectionById('users');
  }
}
