import {Component, OnInit, OnChanges} from '@angular/core';
import {ShotsService} from '../services/shots.service';
import {Observable} from 'rxjs/Observable';
import {ShotMod} from '../models/shot.model';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AuthService} from '../services/auth.service';
import {query} from '@angular/core/src/animation/dsl';
import {User} from 'firebase';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {ChatService} from '../services/chat.service';
import {forEach} from '@angular/router/src/utils/collection';
import { Subject } from 'rxjs/Subject'

//import { read } from 'fs';


@Component({
  selector: 'app-shotlist',
  templateUrl: './shotlist.component.html',
  styleUrls: ['./shotlist.component.css']
})
export class ShotlistComponent implements OnInit {
  static userID: string;
  //shots: FirebaseListObservable<ShotMod[]>;
  shots;
  test: string;
  path: string;
  userId: any;
  shotArray: ShotMod[];
  average = 0;
  totalDistance = 0;
  finalAverage = 0;
  searchShots;
  startAt = new Subject()
  endAt = new Subject()


  constructor(private af: AngularFireDatabase,
              private authService: AuthService,
              private router: Router,
              private ss: ShotsService) {

    //this.shots = ss.getShots();

  }

  // ngOnInit() {
  //   this.shots = this.ss.getShots();
  //
  //   this.shots.subscribe(result => {
  //     console.log('Number of shots returned:: ' + result.length);
  //   });
  //   this.shots.subscribe(result => {
  //     for (let i of result) {
  //       if (i.club == 'D') {
  //         //console.log("dist "+ parseFloat(i.shotDistance) );
  //         this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
  //         //console.log(this.totalDistance);
  //       }
  //     }
  //
  //     //console.log("Total Distance:: " + this.totalDistance);
  //     this.average = this.totalDistance / result.length;
  //     //console.log("Average:: "+ this.average)
  //
  //   });
  //
  //
  // }
  ngOnInit() {
    //this.shots = this.ss.getShots(this.startAt, this.endAt);

    // this.shots.subscribe(result => {
    //   console.log('Number of shots returned:: ' + result.length);
    // });
    console.log('start: ' + this.startAt + '/n' + 'end: ' + this.endAt);
    //this.ss.getShots('5I', '').subscribe(shots => this.shots = shots);
    this.ss.getShots(this.startAt, this.endAt).subscribe(shots => this.shots = shots);
    this.ss.getShots(this.startAt, this.endAt).subscribe(shots =>{console.log('shots ' + this.shots)});


  }


  search($event) {
    let q = $event.target.value;
    console.log('q: ' + q);
    this.startAt.next(q);
    this.endAt.next(q +'\uf8ff' );
  }


}



