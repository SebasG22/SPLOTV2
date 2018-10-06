import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { from, Observable } from 'rxjs';
import { Project } from '../models';


@Injectable()
export class ProjectService {

    constructor(private afStore: AngularFirestore) { }

    public createProject(project: Project): Observable<any> {
        return from(this.afStore.collection('projects').doc(this.afStore.createId()).set(project));
    }
}
