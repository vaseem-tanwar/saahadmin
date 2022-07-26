import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

declare var $: any;
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  p: number = 1;
  list: any=[];
  details: any=[];
  viewdetail: any=[];
  delId: any;
  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    firstName: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    password: new FormControl('', [ Validators.required]),
    // confirm_password: new FormControl('', [ Validators.required]),
  });
  searchText: any = '';
  submitStatus: boolean = false;
  closeResult: any = '';
  userId: any = '';


  constructor(
    private location: Location,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) {
    this.userId = localStorage.getItem('saah_user_id');
    this.getDetails(this.userId);

  }

  ngOnInit(): void {
  }


  getDetails(id: any){
    this.auth.POSTMETHOD('admin/adminDetailsById', {'admin_id': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.firstName.setValue(this.details.firstName);
      this.applicantEditForm.controls.email.setValue(this.details.email);
      this.applicantEditForm.controls.phone.setValue(this.details.phone);
      this.applicantEditForm.controls.password.setValue(this.details.password);

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
        if (this.applicantEditForm.controls.firstName.value == '' || this.applicantEditForm.controls.firstName.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.email.value == '' || this.applicantEditForm.controls.email.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.phone.value == '' || this.applicantEditForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        // } else if (this.applicantEditForm.controls.password.value == '' || this.applicantEditForm.controls.password.value == undefined) {
        //   // this.toastr.error('Please select your back ground checking file', 'Error');
        //   this.submitStatus = true;
        // }else if (this.applicantEditForm.controls.password.value != this.applicantEditForm.controls.confirm_password.value) {
        //   // this.toastr.error('Please select your back ground checking file', 'Error');
        //   this.submitStatus = true;
        }  else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/updateAdmin',
            this.applicantEditForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.success == true) {
              this.toastr.success(res.message, 'Success');
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
