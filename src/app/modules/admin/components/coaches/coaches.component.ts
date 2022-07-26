import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {FormsModule, FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {Location} from "@angular/common";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

declare var $: any;
@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {

  p: number = 1;
  list: any=[];
  details: any=[];
  viewdetail: any=[];
  delId: any;
  applicantForm = new FormGroup({
    fullName: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone: new FormControl('', [ Validators.required]),
    bio: new FormControl('', [ Validators.required]),
    experience: new FormControl('', [ Validators.required]),
    profileImage: new FormControl(''),
    specialization: new FormControl('', [ Validators.required]),
    password: new FormControl('', [ Validators.required])
  });
  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    fullName: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    bio: new FormControl('', [ Validators.required]),
    experience: new FormControl('', [ Validators.required]),
    profileImage: new FormControl(''),
    specialization: new FormControl('', [ Validators.required]),
  });
  searchText: any = '';
  submitStatus: boolean = false;
  closeResult: any = '';


  constructor(
    private location: Location,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) {

  }

  async createApplicant() {
    try {
      console.log(this.applicantForm.controls.email.value);
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
        } else if (this.applicantForm.controls.experience.value == '' || this.applicantForm.controls.experience.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        }else if (this.applicantForm.controls.bio.value == '' || this.applicantForm.controls.bio.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.specialization.value == '' || this.applicantForm.controls.specialization.value == undefined) {
          // this.toastr.error('Please select your driver licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.password.value == '' || this.applicantForm.controls.password.value == undefined) {
          // this.toastr.error('Please select your driver licence', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/addHealthCoach',
            this.applicantForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              this.reset();
              // this.getList();
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
    this.submitStatus = false;
  }
  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.auth.GETMETHOD('admin/healthCoachList').then((res: any) => {
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
    this.auth.POSTMETHOD('admin/healthCoachIsactive',{'isActive': st, '_id': id}).then((res: any) => {
      console.log(res);
      this.getList();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  getDetails(id: any){
    this.auth.POSTMETHOD('admin/getHealthCoachById', {'_id': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.fullName.setValue(this.details.fullName);
      this.applicantEditForm.controls.email.setValue(this.details.email);
      this.applicantEditForm.controls.phone.setValue(this.details.phone);
      this.applicantEditForm.controls.bio.setValue(this.details.bio);
      this.applicantEditForm.controls.experience.setValue(this.details.experience);
      this.applicantEditForm.controls.specialization.setValue(this.details.specialization);
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  async UpdateApplicant() {
    try {
      console.log(this.applicantEditForm.controls.email.value);
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
        } else if (this.applicantEditForm.controls.experience.value == '' || this.applicantEditForm.controls.experience.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        }else if (this.applicantEditForm.controls.bio.value == '' || this.applicantEditForm.controls.bio.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.specialization.value == '' || this.applicantEditForm.controls.specialization.value == undefined) {
          // this.toastr.error('Please select your driver licence', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/updateHealthCoach',
            this.applicantEditForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.success == true) {
              this.toastr.success(res.message, 'Success');
              // window.location.reload();
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
    this.auth.POSTMETHOD('admin/deleteHealthCoach', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.toastr.success(res.message, 'Success');
      this.getList();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  viewDetails(detail: any){
    this.viewdetail=detail;
    console.log(this.viewdetail.fullName);
  }

}
