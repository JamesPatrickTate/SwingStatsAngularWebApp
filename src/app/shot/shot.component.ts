import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ShotMod} from '../models/shot.model';
import {ShotsService} from '../services/shots.service';
import {ChatMessage} from '../models/chat-message.model';
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {StressModel} from "../models/Stress.model";

@Component({
  selector: 'app-shot',
  templateUrl: './shot.component.html',
  styleUrls: ['./shot.component.css']
})
export class ShotComponent implements OnInit {


  @Input() SHOT: ShotMod;
  $key?: string;
  endLatitude?: string;
  endLongitude?: string;
  startLatitude?: string;
  startLongitude?: string;
  shotDistance?: string;
  shotVelocity?: string;
  wrist?; string;
  userID?: string;
  gsr?: string;
  club?: string;
  swingLength?: string;
  golfCourseAddress?: string;
  weather?: String;
  datum: Date;
  stressData: FirebaseListObservable<StressModel[]>;
  shotDay: string;
  roundDay: string;
  stressArrayD: Array<number>;
  wristSpeedArrayD: Array<number>;
  HRArrayD: Array<number>;
  sTempArrayD:Array<number>;
  distanceArray:Array<number>;
  shots: FirebaseListObservable<ShotMod[]>;
  longest: number;
  average: number;
  counter: number;
  totalDistance: number;
  temp: number;
  averageDistance?: string;
  averageGSR?: string;
  averageHeartRate?: string;
  averageSkinTemp?: string;
  averageWristSpeed?: string;
  differenceDistance?: string;
  differenceGSR?: string;
  differenceHeartRate?: string;
  differenceSkinTemp?: string;
  differenceWristSpeed?: string;
  shotQuality?: string;

  skinTempReding: string
  heartRateReading: string;


  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [0], label: ' '},
    {data: [0], label: ' '},
    {data: [0], label: ' '},
    {data: [0], label: ' '},
    {data: [0], label: ' '}
  ];
  barChartLabels: string[] = [''];

 //  //line chart
 //   public lineChartLegend:boolean = true;
 //   public lineChartType:string = 'line';
 // // public : Array<any> = [''];
 //  public lineChartLabels: number[] = [0];
 //  public lineChartOptions: any = {
 //    responsive: true,
 //    legend: {
 //      display: true,
 //      labels: {
 //        fontColor: 'rgb(255, 99, 132)'
 //      }
 //    }
 //  };
 //  public lineChartColors:Array<any> = [
 //    { // grey
 //      backgroundColor: 'rgba(148,159,177,0.2)',
 //      borderColor: 'rgba(148,159,177,1)',
 //      pointBackgroundColor: 'rgba(148,159,177,1)',
 //      pointBorderColor: '#fff',
 //      pointHoverBackgroundColor: '#fff',
 //      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
 //    },
 //    { // dark grey
 //      backgroundColor: 'rgba(77,83,96,0.2)',
 //      borderColor: 'rgba(77,83,96,1)',
 //      pointBackgroundColor: 'rgba(77,83,96,1)',
 //      pointBorderColor: '#fff',
 //      pointHoverBackgroundColor: '#fff',
 //      pointHoverBorderColor: 'rgba(77,83,96,1)'
 //    },
 //    { // grey
 //      backgroundColor: 'rgba(148,159,177,0.2)',
 //      borderColor: 'rgba(148,159,177,1)',
 //      pointBackgroundColor: 'rgba(148,159,177,1)',
 //      pointBorderColor: '#fff',
 //      pointHoverBackgroundColor: '#fff',
 //      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
 //    }
 //  ];
 //  // lineChart
 //  public lineChartData: Array<any> = [
 //     {data: [0], label: ''},
 //     {data: [0], label: ''},
 //    {data: [0], label: ''}
 //  ];

  constructor(private authService: AuthService, private ss: ShotsService) {
    this.club = 'temp value"';
    this.distanceArray = [0];
    this.stressArrayD = [0];
    this.HRArrayD = [0];
    this.sTempArrayD = [0];
    this.wristSpeedArrayD = [0];

  }

  ngOnInit(SHOT = this.SHOT) {
    this.$key = SHOT.$key;
    this.club = SHOT.club;
    this.shotDistance = parseFloat(SHOT.shotDistance).toFixed(2);
    this.endLatitude = SHOT.endLatitude;
    this.endLongitude = SHOT.endLongitude;
    this.startLatitude = SHOT.startLatitude;
    this.startLongitude = SHOT.startLongitude;
    this.swingLength = SHOT.swingLength;
    this.shotVelocity = SHOT.shotVelocity;
    this.gsr = SHOT.gsr;
    this.shotDay = SHOT.day;
    this.skinTempReding = parseFloat(SHOT.skinTemp).toFixed(3);
    this.heartRateReading = SHOT.heartRatePreShot;
    this.wrist = SHOT.shotVelocity;
    this.shotQuality = SHOT.shotQuality;
    this.averageDistance = SHOT.averageDistance;
    this.averageGSR = SHOT.averageGSR;
    this.averageHeartRate = SHOT.averageHeartRate;
    this.averageSkinTemp = SHOT.averageSkinTemp;
    this.averageWristSpeed = SHOT.averageWristSpeed;
    this.differenceDistance = SHOT.differenceDistance;
    this.differenceGSR = SHOT.differenceGSR;
    this.differenceHeartRate = SHOT.differenceHeartRate;
    this.differenceSkinTemp = SHOT.differenceSkinTemp;
    this.differenceWristSpeed = SHOT.differenceWristSpeed;
    //console.log('differenceHeartRate' + this.differenceHeartRate);
    this.wristSpeedArrayD[0] = parseFloat(this.wrist);
     this.stressArrayD[0] = parseFloat(this.gsr) / 1000;
     this.HRArrayD[0] = parseFloat(this.heartRateReading);
    this.sTempArrayD[0] = parseFloat(this.skinTempReding);
    this.distanceArray[0] = parseFloat(this.shotDistance);
    this.golfCourseAddress = SHOT.golfCourseAddress;
    // this.weather = http://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={lon}&type=hour&start={start}&end={end};

    // this.stressData = this.ss.getStressNoParams();
    // this.stressData.subscribe(result => {
    //   for (const i of result) {
    //
    //
    //
    //     if (i.day === this.shotDay) {
    //
    //        this.lineChartData = [{data: i.heartRateList, label: 'Heart Rate'},
    //          {data: i.gsrList, label: 'GSR'},
    //          {data: i.skinTemp, label: 'Skin Temperature'}];
    //
    //
    //
    //        this.lineChartLabels = i.hrtimes;
    //
    //
    //     }
    //     break;
    //   }
    // });
    //

    this.barChartData = [{data: this.distanceArray, label: 'Driver distances in meters'},
      {data: this.wristSpeedArrayD, label: 'speed of wrist in ms'},
      {data: this.stressArrayD, label: 'GSR level in ohm/10000'},
      {data: this.HRArrayD, label: 'Heart rate in BPM'},
      {data: this.sTempArrayD, label: 'Skin tempemp in Celsius'}];


    this.shots = this.ss.getShotsNoParams();

    this.shots.subscribe(result => {

      this.counter = 0;
      this.totalDistance = 0;
      this.temp = 0;
      this.longest = 0;

      for (const i of result) {
        if (i.club === this.club && parseFloat(i.shotDistance) > 0 && i.swingLength === this.swingLength) {

          this.totalDistance = this.totalDistance + parseFloat(i.shotDistance);
          this.counter++;
          if (parseFloat(i.shotDistance) > this.longest) {
            this.longest = parseFloat(i.shotDistance);
          }
        }
      }

      this.longest = Math.floor(this.longest * 100) / 100;
      this.temp = this.totalDistance / this.counter;
      this.average = Math.floor(this.temp * 100) / 100;
    });





}// END ININT

  toTimestamp(year, month, day, hour, minute, second) {
    this.datum = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    return this.datum.getTime() / 1000;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
