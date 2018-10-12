import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { from, Observable, of, combineLatest } from 'rxjs';
import { IProject } from '../models';
import { switchMap, map, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { get, forEach, filter } from 'lodash';
import { FirebaseServiceAbstract } from '../../shared/abstracts/firebase-service.abstract';

@Injectable()
export class ProjectService extends FirebaseServiceAbstract {

    constructor(private afStore: AngularFirestore) {
        super(afStore);
    }

    public createProject(project: IProject): Observable<any> {
        const id = this.afStore.createId();
        return from(this.afStore.collection('projects').doc(id).set(
            { ...project, state: 'C' }))
            .pipe(
                switchMap(() => {
                    const obs = [];
                    for (const participant of project.participantsIds.split(',')) {
                        obs.push(this.addParticipantToProject(id, get(participant, 'id', participant)));
                    }
                    return combineLatest(obs);
                })
            );
    }


    public isParticipantCreatedOnProject(projectId: string, participantId: string) {
        return from(this.afStore.collection('projects').doc(projectId).collection('participantsIds').doc(participantId).valueChanges()
            .pipe(
                map((data) => {
                    return (data) ? true : false;
                })
            ));
    }

    public checkingParticipantRegisterToProject(projectId: string, participantId: string) {
        return this.isParticipantCreatedOnProject(projectId, participantId)
            .pipe(
                switchMap((value) => {
                    return (value) ? of(value) : this.addParticipantToProject(projectId, participantId);
                })
            );

    }

    public addParticipantToProject(projectId: string, participantId: string) {
        return from(this.afStore.collection('projects').doc(projectId).collection('participants').doc(participantId)
            .set({
                id: participantId,
                created_at: firebase.firestore.FieldValue.serverTimestamp()
            }));
    }

    public getProjects() {
        return this.getCollectionWithSubsCollections('projects', ['participants'])
            .pipe(
                switchMap((response: any) => {
                    const obs = [];
                    forEach(response, (dataItem) => {
                        console.log(dataItem);
                        forEach(dataItem.participants, (participant) => {
                            obs.push(this.getDocumentByCollectionId('users', participant.id, 'user'));
                        });
                    });
                    return (obs.length === 0) ? of([]) : combineLatest(obs)
                        .pipe(
                            map((data) => {
                                console.log('participant', response.participants);
                                forEach(response, (responseItem) => {
                                    forEach(responseItem.participants, (participant) => {
                                        console.log('participant', participant);
                                        participant.user = get(filter(data, (dataItem) => dataItem.id === participant.docId), '0.user', {});
                                        // responseItem.participant.
                                    });
                                });
                                return response;
                            })
                        );
                })
            );
    }
}
