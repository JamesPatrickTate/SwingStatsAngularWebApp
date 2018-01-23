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

  constructor(private ss: ShotsService, private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {



    this.distanceArray = [0];
    this.dates = [0];
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



    // this.shots = this.ss.getShots();
    this.shots = this.ss.getShotsNoParams();

    this.shots.subscribe(result => {

      //driver distance
      for (const i of result) {
        if (i.club === 'D' && parseFloat(i.shotDistance) > 0) {
         // console.log('driver ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;

          if (parseFloat(i.shotDistance) > this.driverlongest) {
            this.driverlongest = parseFloat(i.shotDistance);
          }
        }

      }

      this.driverlongest = Math.floor(this.driverlongest * 100) / 100;


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
         // console.log('sw 1/4 iron total ' + parseFloat(i.shotDistance));
          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
        }
      }
      this.temp = this.totalDistance / this.counter;
      this.swquater = Math.floor(this.temp * 100) / 100;
    });





  } //end init







}





// clubs.add("D");
//         clubs.add("3W");
//         clubs.add("5I");
//         clubs.add("6I");
//         clubs.add("7I");
//         clubs.add("8I");
//         clubs.add("9I");
//         clubs.add("SW");
