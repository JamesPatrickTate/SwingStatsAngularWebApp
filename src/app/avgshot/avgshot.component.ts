import { Component, OnInit } from '@angular/core';
//import { Component, OnInit, OnChanges } from '@angular/core';
import { ShotsService } from '../services/shots.service';
import { Observable } from 'rxjs/Observable';
import { ShotMod } from '../models/shot.model';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AuthService} from '../services/auth.service';
import {query} from '@angular/core/src/animation/dsl';
import {User} from 'firebase';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import {ChatService} from '../services/chat.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-avgshot',
  templateUrl: './avgshot.component.html',
  styleUrls: ['./avgshot.component.css']
})
export class AvgshotComponent implements OnInit {

  shots: FirebaseListObservable<ShotMod[]>;
  test: string;
  path: string;
  userId: any;
  shotArray: ShotMod[];
  driverAverage: number=0;
  driverlongest: number=0;
  fivelongest: number=0;
  totalDistance: number=0;
  fiveAverage: number = 0;
  sixAverage: number = 0;
  counter = 0;


  constructor(private ss: ShotsService) { }

  ngOnInit() {
    this.shots = this.ss.getShots();
    this.shots.subscribe(result => {console.log("Number of shots returned:: "+ result.length)});
    this.shots.subscribe(result => {

      //driver distance
      for(let i of result) {
        if (i.club === 'D' && parseFloat(i.shotDistance) > 0) {
          console.log("driver "+ parseFloat(i.shotDistance) );
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;

          if(parseFloat(i.shotDistance) > this.driverlongest){ this.driverlongest = parseFloat(i.shotDistance);}
        }

    }


    this.driverAverage = this.totalDistance / this.counter;

    });

    //reset values to zero
    this.counter = 0;
    this.totalDistance = 0;

    //5iron
    this.shots.subscribe(result => {

    for(let i of result) {
      if (i.club === '5I' && parseFloat(i.shotDistance) > 0) {
        console.log("5 iron total "+ parseFloat(i.shotDistance) );
        this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
        this.counter++;
        if(parseFloat(i.shotDistance) > this.fivelongest){ this.fivelongest = parseFloat(i.shotDistance);}
      }
  }
  this.fiveAverage = this.totalDistance/this.counter;
    });

    //6iron
    this.shots.subscribe(result => {

      for(let i of result) {
        if (i.club == '6I') {
          console.log("6iron total "+ parseFloat(i.shotDistance) );
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);


        }
    }
    this.sixAverage = this.totalDistance/result.length;
      });



  }

}
// clubs.add("D");
//         clubs.add("3W");
//         clubs.add("5I");
//         clubs.add("6I");
//         clubs.add("7I");
//         clubs.add("8I");
//         clubs.add("9I");
//         clubs.add("SW");
