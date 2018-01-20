import { Injectable } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';


import {ShotMod} from '../models/shot.model';







@Injectable()
export class ShotsService {
  user: Observable<firebase.User>;

  average: number=0;
  totalDistance: number=0;
  finalAverage: number = 0;
  shots: FirebaseListObservable<any[]>;
  shot: ShotMod;
  userID: any;
  shotsPath: string;
  constructor( private db: AngularFireDatabase, private authService: AuthService) {
    authService.authUser().subscribe(user => {

      this.userID = user.uid;
      this.shotsPath = 'shot/' + this.userID;
      this.shots = db.list(this.shotsPath);
      console.log('use:: ' + this.shotsPath);
    });
  }

  getShots(start, end): FirebaseListObservable<ShotMod[]> {
  //getShots(start, end): FirebaseListObservable<ShotMod[]> {

   // return this.shots;
   console.log(' service start: ' + start);
   console.log('end: ' + end);
    return this.db.list('shot/k6QRNaAR5fSl12k6qSHOApHL6Mg2', {
        query: {
          orderByChild: 'club',
          limitToFirst: 10,
          startAt: start,
          endAt: end
      }
    });
  }
  getShotsNoParams(): FirebaseListObservable<ShotMod[]> {
    // return this.shots;
    console.log("getShots path " + this.shotsPath);
    return this.db.list('shot/k6QRNaAR5fSl12k6qSHOApHL6Mg2', {
      //return this.db.list(, {
      query: {
        query: {

          limitToLast: 25,
          orderByKey: true


        }
      }
    });
  }



}
