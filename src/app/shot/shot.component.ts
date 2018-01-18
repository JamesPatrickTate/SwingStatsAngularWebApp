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
    
  }


}
