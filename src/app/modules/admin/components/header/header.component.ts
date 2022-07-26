import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstName: any;
  lastName: any;
  constructor(public auth: AuthService,
                public router: Router) {
    this.firstName = localStorage.getItem('saah_user_firstName');
    this.lastName = localStorage.getItem('saah_user_lastName');
  }

  ngOnInit(): void {
  }

}
