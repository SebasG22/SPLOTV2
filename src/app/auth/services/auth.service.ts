import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthEmail } from '../models';
import { auth } from 'firebase';
import { from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';


@Injectable()
export class AuthService {
    public constructor(private afAuth: AngularFireAuth, private store: Store<{}>) {}

    // TODO: Review if we only need to listen once.
    public listenAuth() {
        return this.afAuth.authState.pipe(
            map((user) => {
                return user;
            }));
    }

    public loginWithEmail(credentials: AuthEmail): Observable<any> {
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
