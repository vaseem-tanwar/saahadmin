import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  list: any =[];
  viewdetail: any=[];
  delId: any;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.auth.GETMETHOD('admin/deliveryBoyList').then((res: any) => {
      console.log(res);
      this.list = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  changeStatus(isApproved:any, id: any){
    let st;
    if (isApproved == true) {
      st = false;
    } else {
      st = true;
    }
    this.auth.POSTMETHOD('admin/deliveryBoyIsactive',{'isActive': st, '_id': id}).then((res: any) => {
      console.log(res);
      this.getUsers();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }


  // delVal(id: any){
  //   this.delId = id;
  // }
  // deleteApplicant(){
  //   this.auth.POSTMETHOD('admin/deleteHealthCoach', {_id: this.delId}).then((res: any) => {
  //     console.log(res);
  //     this.toastr.success(res.message, 'Success');
  //     this.getList();
  //   }, error => {
  //     // this.helper.Hideloading();
  //     // this.helper.printErrorMsg(error.error.error);
  //   });
  // }

  viewDetails(detail: any){
    this.viewdetail=detail;
    console.log(this.viewdetail.fullName);
  }


}
