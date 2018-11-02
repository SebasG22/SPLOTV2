import { Injectable } from '@angular/core';
import { FirebaseServiceAbstract } from 'src/app/shared/abstracts/firebase-service.abstract';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigurationProcessService extends FirebaseServiceAbstract {
    constructor(public afs: AngularFirestore, private http: HttpClient) {
        super(afs);
    }

    public getModels() {
        return this.getCollectionById('configuration-models').pipe(tap(console.warn));
    }

    public getConfigurationChildrenByLevel(projectId: string, userId: string, stepIndex: number) {
        // Crear llamado al backend
        return this.http.post(environment.splotBack, {
            projectId: projectId,
            userId: userId
        }).pipe(
            map((data: { meta: { id: string, name: string }, model: any[] }) => {
                const solitaireFeature = data.model.filter((item) => item.type === 'SolitaireFeature');
                const step = solitaireFeature.filter((item) => item.order === stepIndex)[0];
                const featureGroup = data.model.filter((item) => item.fullId === `${step.fullId[0]}/${step.id}`)[0];
                const childrens = data.model.filter((item) => item.fullId === `${step.fullId[0]}/${step.id}/${featureGroup.id}`);
                return {
                    solitaireFeature: solitaireFeature,
                    step: step,
                    featureGroup: featureGroup,
                    childrens: childrens
                };
            }));


    }
}
