import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public router: Router) {
    let token = localStorage.getItem('saah_Access_Token');
    if (!token) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
  }

}
