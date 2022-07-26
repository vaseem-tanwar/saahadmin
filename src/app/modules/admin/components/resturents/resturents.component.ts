import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

declare var $: any;
@Component({
  selector: 'app-resturents',
  templateUrl: './resturents.component.html',
  styleUrls: ['./resturents.component.css']
})
export class ResturentsComponent implements OnInit {

  list: any =[];
  details: any =[];
  viewdetail: any =[];
  delId: any;
  searchText: any = '';
  submitStatus: boolean = false;

  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    name: new FormControl('', [ Validators.required]),
    hours: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    description: new FormControl('', [ Validators.required]),
    location: new FormControl('', [ Validators.required]),
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
    this.getList();
  }

  getList(){

    this.auth.GETMETHOD('admin/restaurantList').then((res: any) => {
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
    this.auth.POSTMETHOD('admin/restaurantIsactive',{'isActive': st, '_id': id}).then((res: any) => {
      console.log(res);
      this.getList();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  getDetails(id: any){
    this.auth.POSTMETHOD('admin/restaurantDetailsById', {'restaurant_id': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.name.setValue(this.details.name);
      this.applicantEditForm.controls.hours.setValue(this.details.hours);
      this.applicantEditForm.controls.phone.setValue(this.details.phone);
      this.applicantEditForm.controls.description.setValue(this.details.description);
      this.applicantEditForm.controls.location.setValue(this.details.location);
      this.applicantEditForm.controls.image.setValue(this.details.image);
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  async UpdateApplicant()  {
    try {
      console.log(this.applicantEditForm.controls.hours.value);
      if (this.applicantEditForm.valid) {
        this.submitStatus = false;
        if (this.applicantEditForm.controls.name.value == '' || this.applicantEditForm.controls.name.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.hours.value == '' || this.applicantEditForm.controls.hours.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.phone.value == '' || this.applicantEditForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.location.value == '' || this.applicantEditForm.controls.location.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        }else if (this.applicantEditForm.controls.description.value == '' || this.applicantEditForm.controls.description.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHODSECURE('admin/updateRestaurant',
            this.applicantEditForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.success == true) {
              this.toastr.success(res.message, 'Success');
              // this.reset();
              this.getList();
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

  viewDetails(detail: any){
    this.viewdetail=detail;
    console.log(this.viewdetail.name);
  }
  reset() {
    this.applicantEditForm.reset();
    this.submitStatus = false;
  }
  delVal(id: any){
    this.delId = id;
  }
  deleteApplicant(){
    this.auth.POSTMETHOD('admin/deleteRestaurant', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.getList();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }


}
