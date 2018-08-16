import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserProvider } from '../../auth/models';
import { from } from 'rxjs';
import { UserInformation } from '../models';


@Injectable()
export class UserService {

    constructor(private afs: AngularFirestore ) { }

    public getUserInformation(userId: string) {
        return this.afs.collection('users').doc(userId)
        .valueChanges();
    }

    public registerUserInformation(basicInfo: UserProvider) {
        return from(this.afs.collection('users').doc(basicInfo.id)
        .set({...basicInfo, role_id: 'USER_CONFIGURATOR'}));
    }

    public updateUserInformation(userInformation: UserInformation ) {
        return from(this.afs.collection('users').doc(userInformation.id).update(
            userInformation));
    }

    public addUserHistory(userId: string,  message: string) {
        return this.afs.collection('users').doc(userId).collection('histories').doc('').set({
            id: '',
            action: message,
            created_at: '',
            created_by: userId
        });
    }
}
