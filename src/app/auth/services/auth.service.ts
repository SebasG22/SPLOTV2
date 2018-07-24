import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserEmail } from '../models';
import { auth } from 'firebase';
import { from, Observable } from 'rxjs';


@Injectable()
export class AuthService {
    public constructor(private afAuth: AngularFireAuth) {}

    public loginWithEmail(credentials: UserEmail): Observable<any> {
        return from(this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password));
    }

    public loginWithGoogle(): Observable<any> {
        return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
    }

    public loginWithGithub(): Observable<any> {
        return from(this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider()));
    }

    public logout(): Observable<any> {
        return from(this.afAuth.auth.signOut());
    }
}
