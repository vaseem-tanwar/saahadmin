import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-design-map',
  templateUrl: './design-map.component.html',
  styleUrls: ['./design-map.component.css']
})
export class DesignMapComponent implements OnInit {

  constructor(public router: Router) {
    // let token = localStorage.getItem('saah_Access_Token');
    // if (!token) {
    //   this.router.navigate(['login']);
    // }
  }

  ngOnInit(): void {
  }

}
