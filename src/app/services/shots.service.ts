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
  allshots: string;
  constructor( private db: AngularFireDatabase, private authService: AuthService) {
    authService.authUser().subscribe(user => {

      this.userID = user.uid;
      this.shotsPath = 'shot/' + this.userID;
      this.allshots = 'shot/';
      this.shots = db.list(this.shotsPath);


    });
  }

  getShots(start, end): FirebaseListObservable<ShotMod[]> {




    return this.db.list( this.shotsPath, {
        query: {
          orderByChild: 'club',
          limitToFirst: 25,
          startAt: start,
          endAt: end
      }
    });
  }
  getShotsNoParams(): FirebaseListObservable<ShotMod[]> {

    return this.db.list(this.shotsPath, {
      query: {
        query: {

          limitToLast: 100, //test 100n

          orderByKey: true


        }
      }
    });
  }

  getAllShots(): FirebaseListObservable<ShotMod[]> {

    return this.db.list(this.allshots, {
      query: {
        query: {

          //limitToLast: 100, //test 100n

          orderByKey: true


        }
      }
    });
  }
}
