import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase/app";
import {ShotMod} from "../models/shot.model";
import {ShotsService} from "../services/shots.service";

@Component({
  selector: 'app-avglist',
  templateUrl: './avglist.component.html',
  styleUrls: ['./avglist.component.css']
})
export class AvglistComponent implements OnInit {


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

  shots: FirebaseListObservable<ShotMod[]>;


  ///// chart declarations////
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[]= [
    {data: [0], label: ' '}
  ];
  barChartLabels:string[] = ['']; //;

  public barChartData3w:any[]= [
    {data: [0], label: ' '}
  ];
  barChartLabels3w:string[] = ['']; //;

  public barChartData5i:any[]= [
    {data: [0], label: ' '}
  ];
  barChartLabels5i:string[] = ['']; //;

  public barChartData6i:any[]= [
    {data: [0], label: ' '}
  ];
  barChartLabels6i:string[] = ['']; //;

  public barChartData7i:any[]= [
    {data: [0], label: ' '}
  ];
  barChartLabels7i:string[] = ['']; //;

  public barChartData8i:any[]= [
    {data: [0], label: ' '}
  ];
  barChartLabels8i:string[] = ['']; //;

  public barChartData9i:any[]= [
    {data: [0], label: ' '}
  ];
  barChartLabels9i:string[] = ['']; //;

  public barChartDatasw:any[]= [
    {data: [0], label: ' '}
  ];
  barChartLabelssw:string[] = ['']; //;


  /////////////////////////

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase, private ss: ShotsService) {

    this.distanceArray = [0];
    this.distanceArrayW = [0];
    this.distanceArray5 = [0];
    this.distanceArray6 = [0];
    this.distanceArray7 = [0];
    this.distanceArray8 = [0];
    this.distanceArray9 = [0];
    this.distanceArraysw = [0];

    this.dates = [0];
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
          this.barChartLabels.push(day + '/' + month + '/' + '/' + year + ' ' + hour + ':' + min + ':' +second);
          this.distanceArray.push(parseFloat(i.shotDistance));


        }
      }

      this.barChartData = [{data: this.distanceArray, label:'Driver distances in meters'}];



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


        }
      }
      console.log(this.distanceArray);

      this.barChartData5i = [{data: this.distanceArray5, label:'5 Iron distances in meters'}];



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


        }
      }

      this.barChartData3w = [{data: this.distanceArrayW, label:'3 Wood distances in meters'}];



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


        }
      }

      this.barChartData6i = [{data: this.distanceArray6, label:'6 Iron distances in meters'}];



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


        }
      }

      this.barChartData7i = [{data: this.distanceArray7, label:'7 Iron distances in meters'}];



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


        }
      }

      this.barChartData8i = [{data: this.distanceArray8, label:'8 Iron distances in meters'}];



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



        }
      }

      this.barChartData9i = [{data: this.distanceArray9, label:'9 Iron distances in meters'}];



    });

    //////////////////////////////

    this.shots.subscribe(result => {
      this.distanceArray = [];

      for (const i of result) {
        //&& i.swingLength === 'full'
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


        }
      }

      this.barChartDatasw = [{data: this.distanceArraysw, label:'Sand Wedge distances in meters'}];



    });



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
