import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

declare var $: any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  p: number = 1;
  list: any=[];
  details: any=[];
  viewdetail: any=[];
  statusForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    order_status: new FormControl('', [ Validators.required]),
    change_status_reason: new FormControl(''),
  });
  searchText: any = '';
  submitStatus: boolean = false;
  reasonStatus: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.auth.GETMETHOD('admin/allOrderList').then((res: any) => {
      console.log(res);
      this.list = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  viewDetails(detail: any){
    this.viewdetail=detail;
    console.log(this.viewdetail.fullName);
  }

  changeStatus(id: any){
    this.statusForm.controls._id.setValue(id);
  }

  async UpdateStatus() {
    try {
      console.log(this.statusForm.controls.order_status.value);
      if (this.statusForm.valid) {
        this.submitStatus = false;
        if (this.statusForm.controls.order_status.value == '' || this.statusForm.controls.order_status.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.statusForm.controls.order_status.value == 'CANCELLED' && this.statusForm.controls.change_status_reason.value == '') {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else {
          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/changeOrderStatus',
            this.statusForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.success == true) {
              this.toastr.success(res.message, 'Success');
              // window.location.reload();
              // this.reset();
              this.getList();
              $("#StatusFormModal").modal("hide");
            } else {
              this.toastr.error(res.message, 'Error');
            }
          }, error => {
            this.toastr.error(error['message'], 'Error');
          });
          // console.log(user);
        }
      } else {
        this.submitStatus = true;
      }

    } catch (error: any) {
      this.toastr.error(error['message'], 'Error!');
    }
  }

}
