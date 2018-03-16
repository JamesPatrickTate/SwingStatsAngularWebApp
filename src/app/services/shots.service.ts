import { Injectable } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';


import {ShotMod} from '../models/shot.model';
import {StressModel} from "../models/Stress.model";







@Injectable()
export class ShotsService {
  user: Observable<firebase.User>;

  average: number=0;
  totalDistance: number=0;
  finalAverage: number = 0;
  shots: FirebaseListObservable<any[]>;
  stresses: FirebaseListObservable<any[]>;
  shot: ShotMod;
  userID: any;
  shotsPath: string;
  allshots: string;
  stressPath: string;
  constructor( private db: AngularFireDatabase, private authService: AuthService) {
    authService.authUser().subscribe(user => {

      this.userID = user.uid;
      this.shotsPath = 'shot/' + this.userID;
      this.allshots = 'shot/';
      this.shots = db.list(this.shotsPath);
      this.stressPath = 'round/' + this.userID;
      this.stresses = db.list(this.shotsPath);


    });
  }

  getShots(start, end): FirebaseListObservable<ShotMod[]> {
    return this.db.list( this.shotsPath, {
        query: {
          orderByChild: 'club',
          limitTolast: 100,
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

          limitToFirst: 100, //test 100n

          orderByKey: true


        }
      }
    });
  }


  getStressNoParams(): FirebaseListObservable<StressModel[]> {

    return this.db.list(this.stressPath, {
      query: {
        query: {

          limitToLast: 25, //test 100n

          orderByKey: true


        }
      }
    });
  }

  getShotsDATE(start, end): FirebaseListObservable<ShotMod[]> {
    return this.db.list( this.shotsPath, {
      query: {
        orderByChild: 'day',
        limitToLast: 25,
        startAt: start,
        endAt: end
      }
    });
  }
}
