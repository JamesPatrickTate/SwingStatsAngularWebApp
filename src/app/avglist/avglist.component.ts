import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase/app";

@Component({
  selector: 'app-avglist',
  templateUrl: './avglist.component.html',
  styleUrls: ['./avglist.component.css']
})
export class AvglistComponent implements OnInit {


  user: firebase.User;
  userName: string;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) { }

  ngOnInit() {

    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }

      this.getUser().subscribe(a => {
        this.userName = a.displayName;
      });
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/Users/${userId}`;
    return this.db.object(path);
  }



}
