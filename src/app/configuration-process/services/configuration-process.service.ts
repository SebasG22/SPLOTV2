import { Injectable } from '@angular/core';
import { FirebaseServiceAbstract } from 'src/app/shared/abstracts/firebase-service.abstract';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';

@Injectable()
export class ConfigurationProcessService extends FirebaseServiceAbstract {
    constructor(public afs: AngularFirestore) {
        super(afs);
    }

    public getModels() {
        return this.getCollectionById('configuration-models').pipe(tap(console.warn));
    }

    public getConfigurationChildrenByLevel(modelId: string , childrenLevel: number) {
        return this.afs.collection('configuration-models').doc(modelId)
        .collection('childrens', ref => ref.where('childrenLevel', '==', childrenLevel));
}
}
