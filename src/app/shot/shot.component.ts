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

  }

  ngOnInit(SHOT= this.SHOT) {
    this.club = SHOT.club;
    this.shotDistance = SHOT.shotDistance;
  }


}
