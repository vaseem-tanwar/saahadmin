import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  p: number = 1;
  list: any=[];
  viewdetail: any=[];
  details: any=[];
  delId: any;
  submitStatus: boolean = false;

  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    name: new FormControl('', [ Validators.required]),
    location: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    image: new FormControl(''),
  });

  constructor(
    private location: Location,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.auth.GETMETHOD('admin/customerList').then((res: any) => {
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
    this.auth.POSTMETHOD('admin/customerIsactive',{'isActive': st, '_id': id}).then((res: any) => {
      console.log(res);
     this.getUsers();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  reset() {
    this.applicantEditForm.reset();
    this.submitStatus = false;
  }

  viewDetails(detail: any){
    this.viewdetail=detail;
    console.log(this.viewdetail.name);
  }

  getDetails(id: any){
    this.auth.POSTMETHOD('admin/customerDetailsById', {'customer_id': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      console.log(this.details[0].name);
      this.applicantEditForm.controls._id.setValue(this.details[0]._id);
      this.applicantEditForm.controls.name.setValue(this.details[0].name);
      this.applicantEditForm.controls.phone.setValue(this.details[0].phone);
      this.applicantEditForm.controls.location.setValue(this.details[0].location);
      // this.applicantEditForm.controls.image.setValue(this.details[0].image);
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  async UpdateApplicant()  {
    try {
      console.log(this.applicantEditForm.controls.name.value);
      if (this.applicantEditForm.valid) {
        this.submitStatus = false;
        if (this.applicantEditForm.controls.name.value == '' || this.applicantEditForm.controls.name.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.phone.value == '' || this.applicantEditForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.location.value == '' || this.applicantEditForm.controls.location.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHODSECURE('admin/updateCustomer',
            this.applicantEditForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.success == true) {
              this.toastr.success(res.message, 'Success');
              // this.reset();
              this.getUsers();
              $("#EditFormModal").modal("hide");
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
