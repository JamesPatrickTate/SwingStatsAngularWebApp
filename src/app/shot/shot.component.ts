import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {ShotMod} from '../models/shot.model';
import {ShotsService} from '../services/shots.service';
import {ChatMessage} from '../models/chat-message.model';

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
  userID?: string;
  gsr?: string;
  club?: string;
  swingLength?: string;
  golfCourseAddress?: string;
  weather?: String;
  datum: Date;

  constructor(private authService: AuthService) {
    this.club = "temp value";
  }

  ngOnInit(SHOT = this.SHOT) {
    this.$key = SHOT.$key;
    this.club = SHOT.club;
    this.shotDistance = SHOT.shotDistance;
    this.endLatitude = SHOT.endLatitude;
    this.endLongitude = SHOT.endLongitude;
    this.startLatitude = SHOT.startLatitude;
    this.startLongitude = SHOT.startLongitude;
    this.swingLength = SHOT.swingLength;
    this.shotVelocity = SHOT.shotVelocity;
    this.gsr = SHOT.gsr;
    this.golfCourseAddress = SHOT.golfCourseAddress;
    //this.weather = http://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={lon}&type=hour&start={start}&end={end};

  }
   toTimestamp(year,month,day,hour,minute,second){
    this.datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
    return this.datum.getTime()/ 1000;
  }

}
