import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass'],
})
export class ScheduleComponent implements OnInit {
  routes = ['tram', 'bus'];
  activeLink = this.routes[0];

  constructor(

  ) {
    //
  }

  ngOnInit() {
  }
}
