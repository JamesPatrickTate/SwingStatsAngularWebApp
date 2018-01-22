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
import {observableToBeFn} from 'rxjs/testing/TestScheduler';

@Component({
  selector: 'app-avgshot',
  templateUrl: './avgshot.component.html',
  styleUrls: ['./avgshot.component.css']
})
export class AvgshotComponent implements OnInit {

// Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';
  user: firebase.User;
  shots: FirebaseListObservable<ShotMod[]>;
  userNameObs: Observable<string>;
  userName: string;
  userId: any;
  shotArray: ShotMod[];
  driverAverage = 0;
  driverlongest = 0;
  fivelongest = 0;
  totalDistance = 0;
  fiveAverage = 0;
  sixAverage = 0;
  counter = 0;
  temp= 0;
  dates: any[];
  distanceArray: Array<number>;

  constructor(private ss: ShotsService, private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {



    this.distanceArray = [0];
    this.dates = [0];
    // this.shots = this.ss.getShots();
    this.shots = this.ss.getShotsNoParams();

    ////    value for charts////////////////////////////////////////////////





  }


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels:string[] = ['']; //;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[]= [
    {data: [0], label: ' '}
  ];


  ngOnInit() {



    // this.shots = this.ss.getShots();
    this.shots = this.ss.getShotsNoParams();
    ////
    this.shots.subscribe(result => {

      for (const i of result) {
        // i.club === '5I' &&
        if (parseFloat(i.shotDistance) > 0) {

          const year = i.$key.slice(0, 4);
          const month = i.$key.slice(5, 7);
          const day = i.$key.slice(8, 10);
          const hour = i.$key.slice(11, 13);
          const min = i.$key.slice(14, 16);
          const second = i.$key.slice(17, 19);
          const totalTime = year + month + day + hour + min + second;
          console.log('values')
          console.log(i.$key + ':: ' + i.shotDistance);
          //this.dates.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min);
          this.barChartLabels.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min + ':' +second);
          this.distanceArray.push(parseFloat(i.shotDistance));


        }
      }

      this.barChartData = [{data: this.distanceArray, label:'Distance in metres'}];



    });

    ///////////////////////////////////////////////////////////////////////////
    this.shots.subscribe(result => {

      //driver distance
      for (const i of result) {
        if (i.club === 'D' && parseFloat(i.shotDistance) > 0) {
          console.log('driver ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;

          if (parseFloat(i.shotDistance) > this.driverlongest) {
            this.driverlongest = parseFloat(i.shotDistance);
          }
        }

      }


      this.temp = this.totalDistance / this.counter;
      this.driverAverage = Math.floor(this.temp * 100) / 100;

    });

    //reset values to zero
    this.counter = 0;
    this.totalDistance = 0;

    //5iron
    this.shots.subscribe(result => {

      for (const i of result) {
        if (i.club === '5I' && parseFloat(i.shotDistance) > 0) {
          console.log('5 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;
          if (parseFloat(i.shotDistance) > this.fivelongest) {
            this.fivelongest = parseFloat(i.shotDistance);
          }
        }
      }

      this.temp = this.totalDistance / this.counter;
      this.fiveAverage = Math.floor(this.temp * 100) / 100;
    });

    //6iron
    this.shots.subscribe(result => {

      for (const i of result) {
        if (i.club == '6I') {
          console.log('6iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);


        }
      }
      this.sixAverage = this.totalDistance / result.length;
    });


  }//end init







  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
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
