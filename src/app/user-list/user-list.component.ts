import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
// import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {ChatMessage} from '../models/chat-message.model';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
// import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
   courses: FirebaseListObservable<any>;
  constructor(private af: AngularFireDatabase) {
     this.courses = af.list('Users');
    this.courses.subscribe(courses => {
      courses.forEach(course => {
        console.log('name:', course.displayName);
      });
    });
  }

  ngOnInit() {
  }

}
