import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase/app";
import {ShotMod} from "../models/shot.model";
import {ShotsService} from "../services/shots.service";
import {ChatService} from "../services/chat.service";
import {User} from "../models/user.model";
//https://valor-software.com/ng2-charts/
@Component({
  selector: 'app-avglist',
  templateUrl: './avglist.component.html',
  styleUrls: ['./avglist.component.css']
})
export class AvglistComponent implements OnInit {

  counter: number;
  anotherCounter: number;
  user: firebase.User;
  userName: string;
  dates: any[];
  distanceArray: Array<number>;
  distanceArrayW: Array<number>;
  distanceArray5: Array<number>;
  distanceArray6: Array<number>;
  distanceArray7: Array<number>;
  distanceArray8: Array<number>;
  distanceArray9: Array<number>;
  distanceArraysw: Array<number>;
  stressArrayD: Array<number>;
  stressArrayW: Array<number>;
  stressArray5: Array<number>;
  stressArray6: Array<number>;
  stressArray7: Array<number>;
  stressArray8: Array<number>;
  stressArray9: Array<number>;
  stressArraysw: Array<number>;
  shots: FirebaseListObservable<ShotMod[]>;
  allShots: any;
  s: ShotMod[];
  driverlongest: number;
  userList: FirebaseListObservable<User[]>;
  userId: string;
  userLongestDrive: Array<string>;
  data: string;



  ///// chart declarations////
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[]= [
    {data: [0], label: ' '},
    {data: [0], label: ' '}

  ];
  barChartLabels:string[] = ['']; //;

  public barChartData3w:any[]= [
    {data: [0], label: ' '},
    {data: [0], label: ' '}

  ];
  barChartLabels3w:string[] = ['']; //;

  public barChartData5i:any[]= [
    {data: [0], label: ' '},
    {data: [0], label: ' '}

  ];
  barChartLabels5i:string[] = ['']; //;

  public barChartData6i:any[]= [
    {data: [0], label: ' '},
    {data: [0], label: ' '}

  ];
  barChartLabels6i:string[] = ['']; //;

  public barChartData7i:any[]= [
    {data: [0], label: ' '},
    {data: [0], label: ' '}

  ];
  barChartLabels7i:string[] = ['']; //;

  public barChartData8i:any[]= [
    {data: [0], label: ' '},
    {data: [0], label: ' '}

  ];
  barChartLabels8i:string[] = ['']; //;

  public barChartData9i:any[]= [
    {data: [0], label: ' '},
    {data: [0], label: ' '}

  ];
  barChartLabels9i:string[] = ['']; //;

  public barChartDatasw:any[]= [
    {data: [0], label: ' '},
    {data: [0], label: ' '}

  ];
  barChartLabelssw:string[] = ['']; //;




  /////////////////////////

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase, private ss: ShotsService, private cs: ChatService) {

    this.distanceArray = [0];
    this.distanceArrayW = [0];
    this.distanceArray5 = [0];
    this.distanceArray6 = [0];
    this.distanceArray7 = [0];
    this.distanceArray8 = [0];
    this.distanceArray9 = [0];
    this.distanceArraysw = [0];
    this.userLongestDrive = [''];
    this.stressArrayD = [0];

    this.dates = [0];
    console.log('In Constructor');


  }



  ngOnInit() {

    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }

      this.getUser().subscribe(a => {
        this.userName = a.displayName;
      });
    });

    /////////////// charts //////////////////////////////
    this.shots = this.ss.getShotsNoParams();
    ////
    this.shots.subscribe(result => {

      for (const i of result) {

        if (parseFloat(i.club === 'D' && i.shotDistance) > 0) {

          console.log(i.gsr);
          const year = i.$key.slice(0, 4);
          const month = i.$key.slice(5, 7);
          const day = i.$key.slice(8, 10);
          const hour = i.$key.slice(11, 13);
          const min = i.$key.slice(14, 16);
          const second = i.$key.slice(17, 19);
          const totalTime = year + month + day + hour + min + second;
          this.barChartLabels.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min + ':' +second);
          this.distanceArray.push(parseFloat(i.shotDistance));
          this.stressArrayD.push(parseFloat(i.gsr)/10000);
        }
      }
      this.barChartData = [{data: this.distanceArray, label:'Driver distances in meters'},
                            {data: this.stressArrayD, label:'Stress level in ohm/10000', type: 'line'}];
    });


    ////////////////////////////////////////////////////////////////

    this.shots.subscribe(result => {

      for (const i of result) {

      //&& i.swingLength === 'full'
        if (i.club === '5I' && parseFloat( i.shotDistance) > 0 && i.swingLength === 'Full') {

          const year = i.$key.slice(0, 4);
          const month = i.$key.slice(5, 7);
          const day = i.$key.slice(8, 10);
          const hour = i.$key.slice(11, 13);
          const min = i.$key.slice(14, 16);
          const second = i.$key.slice(17, 19);
          const totalTime = year + month + day + hour + min + second;
          console.log('values');
         console.log(i.$key + ':: ' + i.shotDistance);
          //this.dates.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min);
          this.barChartLabels5i.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min + ':' +second);
          this.distanceArray5.push(parseFloat(i.shotDistance));
          this.stressArray5.push(parseFloat(i.gsr)/10000);


        }
      }
      //console.log(this.distanceArray);

      this.barChartData5i = [{data: this.distanceArray5, label:'5 Iron distances in meters'},
        {data: this.stressArray5, label:'Stress level in ohm/10000', type: 'line'}];



    });

    /////////////////////////////////////////
    this.shots.subscribe(result => {


      for (const i of result) {
        //&& i.swingLength === 'full'
        if (i.club === '3W' && parseFloat( i.shotDistance) > 0 && i.swingLength === 'Full' ) {

          const year = i.$key.slice(0, 4);
          const month = i.$key.slice(5, 7);
          const day = i.$key.slice(8, 10);
          const hour = i.$key.slice(11, 13);
          const min = i.$key.slice(14, 16);
          const second = i.$key.slice(17, 19);
          const totalTime = year + month + day + hour + min + second;
         // console.log('values')
         // console.log(i.$key + ':: ' + i.shotDistance);
          //this.dates.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min);
          this.barChartLabels3w.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min + ':' +second);
          this.distanceArrayW.push(parseFloat(i.shotDistance));
          this.stressArrayW.push(parseFloat(i.gsr)/10000);


        }
      }

      this.barChartData3w = [{data: this.distanceArrayW, label:'3 Wood distances in meters'},
        {data: this.stressArrayW, label:'Stress level in ohm/10000', type: 'line'}];



    });

    /////////////////////

    this.shots.subscribe(result => {
      this.distanceArray = [];

      for (const i of result) {
        //&& i.swingLength === 'full'
        if (i.club === '6I' && parseFloat( i.shotDistance) > 0 && i.swingLength === 'Full' ) {

          const year = i.$key.slice(0, 4);
          const month = i.$key.slice(5, 7);
          const day = i.$key.slice(8, 10);
          const hour = i.$key.slice(11, 13);
          const min = i.$key.slice(14, 16);
          const second = i.$key.slice(17, 19);
          const totalTime = year + month + day + hour + min + second;
         // console.log('values')
         // console.log(i.$key + ':: ' + i.shotDistance);
          //this.dates.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min);
          this.barChartLabels6i.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min + ':' +second);
          this.distanceArray6.push(parseFloat(i.shotDistance));
          this.stressArray6.push(parseFloat(i.gsr)/10000);


        }
      }

      this.barChartData6i = [{data: this.distanceArray6, label:'6 Iron distances in meters'},
        {data: this.stressArray6, label:'Stress level in ohm/10000', type: 'line'}];



    });


    ///////////////////////////////////////////////////

    this.shots.subscribe(result => {
      this.distanceArray = [];

      for (const i of result) {
        //&& i.swingLength === 'full'
        if (i.club === '7I' && parseFloat( i.shotDistance) > 0 && i.swingLength === 'Full') {

          const year = i.$key.slice(0, 4);
          const month = i.$key.slice(5, 7);
          const day = i.$key.slice(8, 10);
          const hour = i.$key.slice(11, 13);
          const min = i.$key.slice(14, 16);
          const second = i.$key.slice(17, 19);
          const totalTime = year + month + day + hour + min + second;
         // console.log('values')
          //console.log(i.$key + ':: ' + i.shotDistance);
          //this.dates.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min);
          this.barChartLabels7i.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min + ':' +second);
          this.distanceArray7.push(parseFloat(i.shotDistance));
          this.stressArray7.push(parseFloat(i.gsr)/10000);


        }
      }

      this.barChartData7i = [{data: this.distanceArray7, label:'7 Iron distances in meters'},
        {data: this.stressArray7, label:'Stress level in ohm/10000', type: 'line'};



    });

    ////////////////////////////////

    this.shots.subscribe(result => {


      for (const i of result) {
        //&& i.swingLength === 'full'
        if (i.club === '8I' && parseFloat( i.shotDistance) > 0  && i.swingLength === 'Full') {

          const year = i.$key.slice(0, 4);
          const month = i.$key.slice(5, 7);
          const day = i.$key.slice(8, 10);
          const hour = i.$key.slice(11, 13);
          const min = i.$key.slice(14, 16);
          const second = i.$key.slice(17, 19);
          const totalTime = year + month + day + hour + min + second;
         // console.log('values')
          //console.log(i.$key + ':: ' + i.shotDistance);
          //this.dates.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min);
          this.barChartLabels8i.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min + ':' +second);
          this.distanceArray8.push(parseFloat(i.shotDistance));
          this.stressArray8.push(parseFloat(i.gsr)/10000);


        }
      }

      this.barChartData8i = [{data: this.distanceArray8, label:'8 Iron distances in meters'},
        {data: this.stressArray8, label:'Stress level in ohm/10000', type: 'line'}];



    });

    ///
    this.shots.subscribe(result => {
      this.distanceArray = [];
      for (const i of result) {
        //&& i.swingLength === 'full'
        if (i.club === '9I' && parseFloat( i.shotDistance) > 0 && i.swingLength === 'Full') {

          const year = i.$key.slice(0, 4);
          const month = i.$key.slice(5, 7);
          const day = i.$key.slice(8, 10);
          const hour = i.$key.slice(11, 13);
          const min = i.$key.slice(14, 16);
          const second = i.$key.slice(17, 19);
          const totalTime = year + month + day + hour + min + second;
         // console.log('values');
          //console.log(i.$key + ':: ' + i.shotDistance);
          //this.dates.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min);
          this.barChartLabels9i.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min + ':' +second);
          this.distanceArray9.push(parseFloat(i.shotDistance));
          this.stressArray9.push(parseFloat(i.gsr)/10000);



        }
      }

      this.barChartData9i = [{data: this.distanceArray9, label:'9 Iron distances in meters'},
        {data: this.stressArray9, label:'Stress level in ohm/10000', type: 'line'}];



    });

    //////////////////////////////

    this.shots.subscribe(result => {
      this.distanceArray = [];

      for (const i of result) {
        //console.log("tester   "+result);
        if (i.club === 'SW' && parseFloat( i.shotDistance) > 0 && i.swingLength === 'Full' ) {

          const year = i.$key.slice(0, 4);
          const month = i.$key.slice(5, 7);
          const day = i.$key.slice(8, 10);
          const hour = i.$key.slice(11, 13);
          const min = i.$key.slice(14, 16);
          const second = i.$key.slice(17, 19);
          const totalTime = year + month + day + hour + min + second;
          //console.log('values')
          //console.log(i.$key + ':: ' + i.shotDistance);

          this.barChartLabelssw.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min + ':' +second);
          this.distanceArraysw.push(parseFloat(i.shotDistance));
          this.stressArraysw.push(parseFloat(i.gsr)/10000);


        }
      }

      this.barChartDatasw = [{data: this.distanceArraysw, label:'Sand Wedge distances in meters'},
        {data: this.stressArraysw, label:'Stress level in ohm/10000', type: 'line'}];



    });


    // this.counter = 0;
    // this.allShots = this.ss.getAllShots();
    // this.allShots.subscribe(result => {
    //
    //       this.anotherCounter = 0;
    //       this.driverlongest = 0;
    //       this.data = 'temp';
    //
    //
    //
    //
    //       //////////////////// LONGEST SHOT FOR CURRENT USER //////////////////
    //       do {
    //
    //
    //     Object.values(result[this.counter]).forEach( (i) => {
    //       if (i.club === 'D' && parseFloat(i.shotDistance) > 0) {
    //         if (parseFloat(i.shotDistance) > this.driverlongest) {
    //
    //           this.driverlongest = parseFloat(i.shotDistance);
    //           this.userId = i.$key;
    //         }
    //     }});
    //         this.data = result[this.counter].$key + ' ' + this.driverlongest;
    //         this.userLongestDrive.push(this.data);
    //
    //         this.counter++;
    //         this.driverlongest = 0;
    //       } while (this.counter < result.length); // END DO WHILE
    //   if(this.counter === result.length ){
    //     console.log(this.userLongestDrive);
    //   }
    //
    // });



  }



  getUser() {
    const userId = this.user.uid;
    const path = `/Users/${userId}`;
    return this.db.object(path);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



}
