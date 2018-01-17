import { Component, OnInit, OnChanges } from '@angular/core';
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


@Component({
  selector: 'app-shotlist',
  templateUrl: './shotlist.component.html',
  styleUrls: ['./shotlist.component.css']
})
export class ShotlistComponent implements OnInit {
  static   userID: string;
  shots: FirebaseListObservable<ShotMod[]>;
  test: string;
  path: string;
  userId: any;
  shotArray: ShotMod[];


  constructor(private af: AngularFireDatabase,
     private authService: AuthService, 
      private router: Router,
      private ss: ShotsService) {

        this.shots = ss.getShots();
      
  }
  ngOnInit() {
    this.shots = this.ss.getShots();
    //console.log(this.shots);
    this.shots.subscribe(result => {console.log("Number of shots returned:: "+ result.length)});
    this.shots.subscribe(result => {console.log(result)});
    


  }
}



