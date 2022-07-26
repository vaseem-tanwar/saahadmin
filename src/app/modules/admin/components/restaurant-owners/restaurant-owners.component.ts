import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {HelperService} from "../../../../services/helper.service";
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {ToastrService, Toast} from "ngx-toastr";

declare var $: any;
@Component({
  selector: 'app-restaurant-owners',
  templateUrl: './restaurant-owners.component.html',
  styleUrls: ['./restaurant-owners.component.css']
})
export class RestaurantOwnersComponent implements OnInit {
  // @ts-ignore
  @ViewChild('form') form;
  p: number = 1;
  list: any=[];
  details: any=[];
  viewdetail: any=[];
  applicantForm = new FormGroup({
    fullName: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone: new FormControl('', [ Validators.required]),
    location: new FormControl('', [ Validators.required]),
    profileImage: new FormControl(''),
    countryCode: new FormControl(''),
  });
  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    fullName: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    location: new FormControl('', [ Validators.required]),
    profileImage: new FormControl(''),
    countryCode: new FormControl(''),
  });
  searchText: any = '';
  submitStatus: boolean = false;
  closeResult: any = '';
  delId: any;
  image: any;

  constructor(
              private location: Location,
              private router: Router,
              public formBuilder: FormBuilder,
              public auth: AuthService,
              public helper: HelperService,
              public toastr: ToastrService) { }

  ngOnInit(): void {
    // this.toastr.error('Invalid Credential!!!', 'Error');
    this.getList();
  }

  getList(){
    this.auth.GETMETHOD('admin/restaurantOwnerList').then((res: any) => {
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
    this.auth.POSTMETHOD('admin/restaurantOwnerIsactive',{'isActive': st, '_id': id}).then((res: any) => {
      console.log(res);
      this.getList();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  async createApplicant() {
    try {
      console.log(this.applicantForm.value);
      if (this.applicantForm.valid) {
        this.submitStatus = false;
        if (this.applicantForm.controls.fullName.value == '' || this.applicantForm.controls.fullName.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.email.value == '' || this.applicantForm.controls.email.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.phone.value == '' || this.applicantForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.location.value == '' || this.applicantForm.controls.location.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/addRestaurantOwner',
            this.applicantForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.success == true) {
              this.toastr.success(res.message, 'Success');
              this.reset();
              this.getList();
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

  reset() {
    this.applicantForm.reset();
    this.applicantEditForm.reset();
    this.submitStatus = false;
  }

  getDetails(id: any){
    this.auth.POSTMETHOD('admin/getRestaurantOwnerById', {'_id': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.fullName.setValue(this.details.fullName);
      this.applicantEditForm.controls.email.setValue(this.details.email);
      this.applicantEditForm.controls.phone.setValue(this.details.phone);
      this.applicantEditForm.controls.countryCode.setValue(this.details.countryCode);
      this.applicantEditForm.controls.location.setValue(this.details.location);
      this.applicantEditForm.controls.profileImage.setValue(this.details.profileImage);
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }


  async updateApplicant() {
    try {
      console.log(this.applicantEditForm.value);
      if (this.applicantEditForm.valid) {
        this.submitStatus = false;
        if (this.applicantEditForm.controls.fullName.value == '' || this.applicantEditForm.controls.fullName.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.email.value == '' || this.applicantEditForm.controls.email.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.phone.value == '' || this.applicantEditForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.location.value == '' || this.applicantEditForm.controls.location.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/updatRestaurantOwner',
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

  delVal(id: any){
    this.delId = id;
  }
  deleteApplicant(){
    this.auth.POSTMETHOD('admin/deleteRestaurantOwner', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.getList();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  viewDetails(detail: any){
    this.viewdetail=detail;
    console.log(this.viewdetail.name);
  }

}
