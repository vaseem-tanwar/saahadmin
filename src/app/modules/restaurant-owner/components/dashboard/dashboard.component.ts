import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  resturents: any=[];
  drivers: any=[];
  foods: any=[];
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){

    let owner =  localStorage.getItem('saah_user_id');
    this.auth.POSTMETHOD('admin/restaurantListById',{owner_id: owner}).then((res: any) => {
      console.log(res);
      this.resturents = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
    this.auth.GETMETHOD('admin/deliveryBoyList').then((res: any) => {
      console.log(res);
      this.drivers = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });

  }

}
