import { Component, OnInit, Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public toastr: ToastrService) { }

  ngOnInit() {
  }
  successmsg(msg: any){
    this.toastr.success(msg,'Success')
  }
  errorsmsg(msg: any){
    this.toastr.error("Toastr Error Notification",'Error')

  }
  infotoastr(msg: any)
  {
    this.toastr.info("Important News", 'Information');
  }
  toastrwaring(msg: any)
  {
    this.toastr.warning("Battery about to Die", 'Warning');
  }

}
