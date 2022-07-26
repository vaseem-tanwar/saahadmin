import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  users: any=[];
  resturentowners: any=[];
  drivers: any=[];
  coaches: any=[];
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.auth.GETMETHOD('admin/customerList').then((res: any) => {
      console.log(res);
      this.users = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
    this.auth.GETMETHOD('admin/restaurantOwnerList').then((res: any) => {
      console.log(res);
      this.resturentowners = res.response_data;
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
    this.auth.GETMETHOD('admin/healthCoachList').then((res: any) => {
      console.log(res);
      this.coaches = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

}
