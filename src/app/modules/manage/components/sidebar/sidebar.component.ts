import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-manage-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  links: string[] = [
    'dashboard',
    'articles',
    'categories',
    'tags',
    'comments'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
