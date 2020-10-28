import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  items = [
    {
      name: 'Schedule',
      link: '/schedule',
      icon: 'tram',
    },
    {
      name: 'Name2',
      link: '/some',
      icon: 'check_circle_outline',
    },
    {
      name: 'Name3',
      link: '/some1',
      icon: 'check_circle_outline',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
