import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fullName: any;
  constructor(public auth: AuthService,
              public router: Router) {
    this.fullName = localStorage.getItem('saah_user_fullName');
  }

  ngOnInit(): void {
  }

}
