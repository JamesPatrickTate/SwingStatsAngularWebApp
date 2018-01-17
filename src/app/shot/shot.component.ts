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
    console.log("club from shot component:: " + this.club)
  }


}
// @Input() chatMessage: ChatMessage;
//   userEmail: string;
//   userName: string;
//   messageContent: string;
//   timeStamp: Date = new Date();
//   isOwnMessage: boolean;
//   ownEmail: string;

//   constructor(private authService: AuthService) {
//     authService.authUser().subscribe(user => {
//       this.ownEmail = user.email;
//       this.isOwnMessage = this.ownEmail === this.userEmail;
//     });
//   }

//   ngOnInit(chatMessage = this.chatMessage) {
//     this.messageContent = chatMessage.message;
//     this.timeStamp = chatMessage.timeSent;
//     this.userEmail = chatMessage.email;
//     this.userName = chatMessage.userName;
//   }