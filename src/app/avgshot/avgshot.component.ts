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
  owndriverLongest= 0;
  driverlongest = 0;
  woodlongest = 0;
  fivelongest = 0;
  sixlongest = 0;
  sevenlongest = 0;
  eigthlongest = 0;
  ninelongest = 0;
  swlongest = 0;
  totalDistance = 0;
  driverAverage = 0;
  woodAverage = 0;
  fiveAverage = 0;
  sixAverage = 0;
  sevenAverage = 0;
  eigthAverage = 0;
  nineAverage = 0;
  swAverage = 0;

  // 3/4
  woodthree = 0;
  fivethree = 0;
  sixthree = 0;
  seventhree = 0;
  eigththree = 0;
  ninethree = 0;
  swthree = 0;

  //1/2
  woodhalf = 0;
  fivehalf = 0;
  sixhalf = 0;
  sevenhalf = 0;
  eigthhalf = 0;
  ninehalf = 0;
  swhalf= 0;

  //1/4
  woodquater = 0;
  fivequater = 0;
  sixquater = 0;
  sevenquater = 0;
  eigthquater = 0;
  ninequater = 0;
  swquater = 0;

  //
  counter = 0;
  temp= 0;
  dates: any[];
  distanceArray: Array<number>;
  driverCounter = 0;
  woodCounter = 0;
  fiveCounter = 0;
  sixCounter = 0;
  sevenCounter = 0;
  eigthCounter = 0;
  nineCounter = 0;
  swCounter = 0;
  counterArray: Array<number>;
 public doughnutChartData: number [];
  public doughnutChartLabels: string [] = ['Driver', '3Wood', '5Iron', '6Iron', '7Iron', '8Iron', '9Iron', 'swIron'];
  public doughnutChartType: string = 'doughnut';
  public chartColors: any[] = [
    {
      backgroundColor:["#000000", "#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0", "#7360ff", "#ff609d", "#ffc360"]
    }];
  public doughnutChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  userList: FirebaseListObservable<User[]>;
  allShots: any;
  userLongestDrive: Array<string>;
  data: string;
  count: number;



  constructor(private ss: ShotsService, private afAuth: AngularFireAuth,
              private db: AngularFireDatabase, private cs: ChatService) {


    this.doughnutChartData= [0];
    this.distanceArray = [0];
    this.dates = [0];
    this.userLongestDrive = [''];
    // this.shots = this.ss.getShots();
    this.shots = this.ss.getShotsNoParams();

    ////    value for charts////////////////////////////////////////////////





  }


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = ['']; //;
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[]= [
    {data: [0], label: ' '}
  ];


  ngOnInit() {

    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }

      this.getUser().subscribe(a => {
        this.userName = a.displayName;
      });
    });



    // this.shots = this.ss.getShots();
    this.shots = this.ss.getShotsNoParams();

    this.shots.subscribe(result => {

      //driver distance
      for (const i of result) {
        if (i.club === 'D' && parseFloat(i.shotDistance) > 0) {
         // console.log('driver ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;
          this.driverCounter++;
          console.log('woodcounter ' + this.woodCounter);

          if (parseFloat(i.shotDistance) > this.driverlongest) {
            this.driverlongest = parseFloat(i.shotDistance);
          }
        }

      }

      this.owndriverLongest = Math.floor(this.driverlongest * 100) / 100;
      //this.driverlongest = Math.floor(this.driverlongest * 100) / 100;


      this.temp = this.totalDistance / this.counter;
      this.driverAverage = Math.floor(this.temp * 100) / 100;

    });

    //reset values to zero


    // 3 wood


    this.shots.subscribe(result => {

      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      console.log('in 3 wood counter pre loop set tp 0 ' + this.counter);
    for (const i of result) {
      if (i.club === '3W' && parseFloat(i.shotDistance) > 0 && i.swingLength === 'Full' ) {

        this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
        this.counter++;
        this.woodCounter++;
        console.log('woodcounter ' + this.woodCounter);
        if (parseFloat(i.shotDistance) > this.woodlongest) {
          this.woodlongest = parseFloat(i.shotDistance);
        }
      }

    }
      this.woodlongest = Math.floor(this.woodlongest * 100) / 100;
    this.temp = this.totalDistance / this.counter;
    this.woodAverage = Math.floor(this.temp * 100) / 100;
  });






    //5iron
    this.shots.subscribe(result => {

      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '5I' && parseFloat(i.shotDistance) > 0 && i.swingLength === 'Full') {

          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;
          this.fiveCounter++;
          console.log('fivecounter ' + this.fiveCounter);
          if (parseFloat(i.shotDistance) > this.fivelongest) {
            this.fivelongest = parseFloat(i.shotDistance);
          }
        }
      }

      this.fivelongest = Math.floor(this.fivelongest * 100) / 100;
      this.temp = this.totalDistance / this.counter;
      this.fiveAverage = Math.floor(this.temp * 100) / 100;
    });



    //6iron
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '6I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === 'Full' ) {
         console.log('6 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;
          this.sixCounter++;

          console.log(this.counter);
          if (parseFloat(i.shotDistance) > this.sixlongest) {
            this.sixlongest = parseFloat(i.shotDistance);
          }

        }
      }

      this.sixlongest = Math.floor(this.sixlongest * 100) / 100;
      this.temp = this.totalDistance / this.counter;
      this.sixAverage = Math.floor(this.temp * 100) / 100;
    });



    // 7iron
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '7I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === 'Full') {
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;
          this.sevenCounter++;

          if (parseFloat(i.shotDistance) > this.sevenlongest) {
            this.sevenlongest = parseFloat(i.shotDistance);
          }

        }
      }
      this.sevenlongest = Math.floor(this.sevenlongest * 100) / 100;
      this.temp = this.totalDistance / this.counter;
      this.sevenAverage = Math.floor(this.temp * 100) / 100;
    });


    // 8 iron

    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '8I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === 'Full') {
         // console.log('8 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;
          this.eigthCounter++;
          if (parseFloat(i.shotDistance) > this.eigthlongest) {
            this.eigthlongest = parseFloat(i.shotDistance);
          }

        }
      }
      this.eigthlongest = Math.floor(this.eigthlongest * 100) / 100;
      this.temp = this.totalDistance / this.counter;
      this.eigthAverage = Math.floor(this.temp * 100) / 100;
    });



    // 9 iron

    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '9I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === 'Full') {
         // console.log(' 9 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;
          this.nineCounter++;
          if (parseFloat(i.shotDistance) > this.ninelongest) {
            this.ninelongest = parseFloat(i.shotDistance);
          }

        }
      }
      this.ninelongest = Math.floor(this.ninelongest * 100) / 100;
      this.temp = this.totalDistance / this.counter;
      this.nineAverage = Math.floor(this.temp * 100) / 100;
    });



    //sw
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === 'sw'  && parseFloat(i.shotDistance) > 0 && i.swingLength === 'Full') {
         // console.log('sw iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;
          this.swCounter++;
          if (parseFloat(i.shotDistance) > this.swlongest) {
            this.swlongest = parseFloat(i.shotDistance);
          }

        }
      }
      this.swlongest = Math.floor(this.swlongest * 100) / 100;
      this.temp = this.totalDistance / this.counter;
      this.swAverage = Math.floor(this.temp * 100) / 100;
    });


    ///////////////////3/4//////////////////////////////////

    //reset values to zero
    this.counter = 0;
    this.totalDistance = 0;
    this.temp = 0;

    // 3 wood


    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;
      for (const i of result) {
        if (i.club === '3W' && parseFloat(i.shotDistance) > 0 && i.swingLength === '3/4') {
          this.counter++;
          this.woodCounter++;
          console.log('woodcounter ' + this.woodCounter);
         // console.log('3 wood 3/4' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
        }

      }
      this.temp = this.totalDistance / this.counter;
      this.woodthree = Math.floor(this.temp * 100) / 100;
    });

    //5iron
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '5I' && parseFloat(i.shotDistance) > 0 && i.swingLength === '3/4') {
          this.counter++;
          this.fiveCounter++;
         // console.log('5 3/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }

      this.temp = this.totalDistance / this.counter;
      this.fivethree = Math.floor(this.temp * 100) / 100;
    });

    //6iron
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '6I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '3/4') {
          this.counter++;
          this.sixCounter++;
         // console.log('6 3/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }
      this.temp = this.totalDistance / this.counter;
      this.sixthree = Math.floor(this.temp * 100) / 100;
    });

    //reset values to zero
    this.counter = 0;
    this.totalDistance = 0;
    this.temp = 0;

    // 7iron
    this.shots.subscribe(result => {

      for (const i of result) {
        if (i.club === '7I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '3/4') {
          this.counter++;
          this.sevenCounter++;
          //console.log('7 3/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }
      this.temp = this.totalDistance / this.counter;
      this.seventhree = Math.floor(this.temp * 100) / 100;
    });

    // 8 iron

    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '8I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '3/4') {
          this.counter++;
          this.eigthCounter++;
          //console.log('8 3/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }
      this.temp = this.totalDistance / this.counter;
      this.eigththree = Math.floor(this.temp * 100) / 100;
    });

    // 9 iron

    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '9I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '3/4') {
          this.counter++;
          this.nineCounter++;
         // console.log(' 9  3/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);


        }
      }
      this.temp = this.totalDistance / this.counter;
      this.ninethree = Math.floor(this.temp * 100) / 100;
    });


    //sw
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === 'sw'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '3/4') {
          this.counter++;
          this.swCounter++;
          //console.log('sw iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
        }
      }
      this.temp = this.totalDistance / this.counter;
      this.swthree = Math.floor(this.temp * 100) / 100;
    });

    ////////////////////1/2///////////////////////////


    //reset values to zero
    this.counter = 0;
    this.totalDistance = 0;
    this.temp = 0;

    // 3 wood


    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;
      for (const i of result) {
        if (i.club === '3W' && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/2') {
          this.counter++;
          this.woodCounter++;
          console.log('woodcounter ' + this.woodCounter);
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          console.log('3 wood 1/2' + i.shotDistance );
          console.log('totals dist ' + this.totalDistance);
        }

      }
      this.temp = this.totalDistance / this.counter;
      this.woodhalf = Math.floor(this.temp * 100) / 100;
    });






    //5iron
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '5I' && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/2') {
          this.counter++;
          this.fiveCounter++;
         // console.log('5 1/2 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }

      this.temp = this.totalDistance / this.counter;
      this.fivehalf = Math.floor(this.temp * 100) / 100;
    });

    //reset values to zero
    this.counter = 0;
    this.totalDistance = 0;
    this.temp = 0;

    //6iron
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '6I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/2') {
          this.counter++;
          this.sixCounter++;
         // console.log('6 1/2 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }
      console.log("td "+ this.totalDistance);
      console.log("c"+ this.counter);
      console.log("div " + this.totalDistance/ this.counter);
      this.temp = this.totalDistance / this.counter;
      this.sixhalf = Math.floor(this.temp * 100) / 100;
    });



    // 7iron
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '7I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/2') {
          this.counter++;
          this.sevenCounter++;
          //console.log('7 1/2 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }
      this.temp = this.totalDistance / this.counter;
      this.sevenhalf = Math.floor(this.temp * 100) / 100;

    });



    // 8 iron

    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '8I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/2') {
          this.counter++;
          this.eigthCounter++;
         // console.log('8 1/2 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }
      this.temp = this.totalDistance / this.counter;
      this.eigthhalf = Math.floor(this.temp * 100) / 100;
    });



    // 9 iron

    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '9I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/2') {
          this.counter++;
          this.nineCounter++;
          //console.log(' 9  1/2 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);


        }
      }
      this.temp = this.totalDistance / this.counter;
      this.ninehalf = Math.floor(this.temp * 100) / 100;
    });



    //sw
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === 'sw'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/2') {
          this.counter++;
          this.swCounter++;
          //console.log('sw iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
        }
      }
      this.temp = this.totalDistance / this.counter;
      this.swhalf = Math.floor(this.temp * 100) / 100;
    });

    //////////////////////////////1/4////////////////////




    // 3 wood


    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;
      for (const i of result) {
        if (i.club === '3W' && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/4') {
          this.counter++;
          this.woodCounter++;

         // console.log('3 wood 1/4' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
        }

      }
      this.temp = this.totalDistance / this.counter;
      this.woodquater = Math.floor(this.temp * 100) / 100;
    });



    //5iron
    this.shots.subscribe(result => {

      for (const i of result) {
        if (i.club === '5I' && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/4') {
          this.counter++;
          this.fiveCounter++;
         // console.log('5 1/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }

      this.temp = this.totalDistance / this.counter;
      this.fivequater = Math.floor(this.temp * 100) / 100;
    });


    //6iron
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '6I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/4') {
          this.counter++;
          this.sixCounter++;
         // console.log('6 1/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }
      this.temp = this.totalDistance / this.counter;
      this.sixquater = Math.floor(this.temp * 100) / 100;
    });


    // 7iron
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '7I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/4') {
          this.counter++;
          this.sevenCounter++;
          //console.log('7 1/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }
      this.temp = this.totalDistance / this.counter;
      this.sevenquater = Math.floor(this.temp * 100) / 100;
    });


    // 8 iron

    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '8I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/4') {
          this.counter++;
          this.eigthCounter++;
        //  console.log('8 1/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);

        }
      }
      this.temp = this.totalDistance / this.counter;
      this.eigthquater = Math.floor(this.temp * 100) / 100;
    });


    // 9 iron

    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === '9I'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/4') {
          this.counter++;
         // console.log(' 9  1/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);


        }
      }
      this.temp = this.totalDistance / this.counter;
      this.ninequater = Math.floor(this.temp * 100) / 100;
    });



    //sw
    this.shots.subscribe(result => {
      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;

      for (const i of result) {
        if (i.club === 'sw'  && parseFloat(i.shotDistance) > 0 && i.swingLength === '1/4') {
          this.counter++;
          this.swCounter++;
          this.doughnutChartData[7] = this.swCounter;

         // console.log('sw 1/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
        }
      }
      this.temp = this.totalDistance / this.counter;
      this.swquater = Math.floor(this.temp * 100) / 100;
    });

    // count each shot taken with a club for the donut graph, add them to the data
    this.shots.subscribe(result => {

      for (const i of result) {
        if (i.club === 'D' && parseFloat(i.shotDistance) > 0 &&  parseFloat(i.heartRatePreShot) > 0 && i.swingLength === 'Full' ) {
         this.driverCounter++;
        }else if (i.club === '3W' && parseFloat(i.shotDistance) > 0 &&  parseFloat(i.heartRatePreShot) > 0 && i.swingLength === 'Full') {
          this.woodCounter++;
      }else if (i.club === '5I' && parseFloat(i.shotDistance) > 0 &&  parseFloat(i.heartRatePreShot) > 0 && i.swingLength === 'Full') {
          this.fiveCounter++;
        }else if (i.club === '6I' && parseFloat(i.shotDistance) > 0 &&  parseFloat(i.heartRatePreShot) > 0 && i.swingLength === 'Full') {
          this.sixCounter++;
        }else if (i.club === '7I' && parseFloat(i.shotDistance) > 0 &&  parseFloat(i.heartRatePreShot) > 0 && i.swingLength === 'Full') {
          this.sevenCounter++;
        }else if (i.club === '8I' && parseFloat(i.shotDistance) > 0 &&  parseFloat(i.heartRatePreShot) > 0 && i.swingLength === 'Full') {
          this.eigthCounter++;
        }else if (i.club === '9I' && parseFloat(i.shotDistance) > 0 &&  parseFloat(i.heartRatePreShot) > 0 && i.swingLength === 'Full') {
          this.nineCounter++;
        }else if (i.club === 'sw' && parseFloat(i.shotDistance) > 0 &&  parseFloat(i.heartRatePreShot) > 0 && i.swingLength === 'Full') {
          this.swCounter++;
        }
      }
      this.doughnutChartData[0] = this.driverCounter;
      this.doughnutChartData.push(this.woodCounter);
      this.doughnutChartData.push( this.fiveCounter);
      this.doughnutChartData.push(this.sixCounter);
      this.doughnutChartData.push(this.sevenCounter);
      this.doughnutChartData.push(this.eigthCounter);
      this.doughnutChartData.push(this.nineCounter);
      this.doughnutChartData.push(this.swCounter);
      console.log(this.doughnutChartLabels);
      console.log(this.doughnutChartData);
    });



    ///////////////// top long shots ///////////////

     this.count = 0;
     this.driverlongest = 0;
    this.allShots = this.ss.getAllShots();
    this.allShots.subscribe(result => {
          this.driverlongest = 0;
          this.data = 'temp';
          //////////////////// LONGEST SHOT FOR CURRENT USER //////////////////
          do {
        Object.values(result[this.count]).forEach( (i) => {
          if (i.club === 'D' && parseFloat(i.shotDistance) > 0) {
            if (parseFloat(i.shotDistance) > this.driverlongest) {
              this.driverlongest = parseFloat(i.shotDistance);
             this.userId = i.email;
            }
        }});
            this.data = this.userId + ' ' + this.driverlongest.toFixed(2);
            this.userLongestDrive.push(this.data);
            this.count++;
            this.driverlongest = 0;
          } while (this.count < result.length); // END DO WHILE
      if (this.count === result.length ){
        console.log("Longest " + this.userLongestDrive);
      }
    });
  } // end init
  getUser() {
    const userId = this.user.uid;
    const path = `/Users/${userId}`;
    return this.db.object(path);
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



}




