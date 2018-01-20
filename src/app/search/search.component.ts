import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {ShotsService } from '../services/shots.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // movies;
  // startAt = new Subject()
  // endAt = new Subject()

  constructor() { }

  ngOnInit() {
  }

}
