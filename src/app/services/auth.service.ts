import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  uid: string;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
    this.user = afAuth.authState;
  }

  authUser() {
    console.log(this.user);
    return this.user;
  }

   currentUserId(): string {
    return this.authState !== null ? this.authState.uid : 'none';
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        //this.setUserStatus('online');
        this.router.navigate(['dashboard']);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `Users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string): void {
    const path = `Users/${this.currentUserId}`;

    const data = {
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
  getid() {
    console.log(this.afAuth.idToken);
    console.log('test');
  }

}
