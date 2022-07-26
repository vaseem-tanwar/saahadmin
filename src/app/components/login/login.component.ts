import { Component, OnInit, Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators, FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HelperService} from "../../services/helper.service";
import {NotificationComponent} from "../../notification/notification.component";
import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [ Validators.required]),
    userType: new FormControl('' , [ Validators.required]),
  });
  user_Type: any;
  submitStatus: boolean = false;
  constructor(
    private auth: AuthService,
    public router: Router,
    public helper: HelperService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    let token = localStorage.getItem('saah_Access_Token');
    let type = localStorage.getItem('saah_user_type');
    if (token){
      if (type =='SUPER_ADMIN') {
        this.router.navigate(['admin']);
      }else if (type == 'RESTAURANTOWNER') {
        this.router.navigate(['restaurant-owner']);
      } else {}
    }
  }

  onSubmit(){
    console.log(this.loginForm.value);
    if (this.loginForm.valid){
      if (this.loginForm.controls.email.value == '' || this.loginForm.controls.email.value == undefined) {
        // this.toastr.error('Please select your driver licence', 'Error');
        this.submitStatus = true;
      } else if (this.loginForm.controls.password.value == '' || this.loginForm.controls.password.value == undefined) {
        // this.toastr.error('Please select your driver licence', 'Error');
        this.submitStatus = true;
      // }else if (this.loginForm.controls.userType.value == '' || this.loginForm.controls.userType.value == undefined) {
      //   // this.toastr.error('Please select your driver licence', 'Error');
      //   this.submitStatus = true;
      } else {
        this.submitStatus = false;
        // this.auth
        this.auth.POSTMETHOD('admin/adminLogin',
          this.loginForm.value).then((res: any) => {
          console.log(res);
          console.log(res.response_data.authToken);
          if (res.success == true) {
            localStorage.setItem('saah_Access_Token', res.response_data.authToken);
            localStorage.setItem('saah_user_id', res.response_data.userDetails._id);
            localStorage.setItem('saah_user_type', res.response_data.userDetails.userType);
            // localStorage.setItem('saah_user', JSON.stringify(res.response_data.userDetails));
            // localStorage.setItem('saah_user_email', res.data.email);
            // localStorage.setItem('saah_user_image', res.data.image);
            this.toastr.success(res.message, 'Success');
            // this.helper.successmsg(res.message);
            if (res.response_data.userDetails.userType =='SUPER_ADMIN') {
              localStorage.setItem('saah_user_firstName', res.response_data.userDetails.firstName);
              localStorage.setItem('saah_user_lastName', res.response_data.userDetails.lastName);
              this.router.navigate(['admin']);
            }else {
              localStorage.setItem('saah_user_fullName', res.response_data.userDetails.fullName);
              this.router.navigate(['restaurant-owner']);
            }
          } else {
          }
        }, error => {
          this.helper.successmsg('Invalid');
          // this.helper.printErrorMsg(error.error.error);
        });

      }

    } else {
      this.submitStatus = true;
    }

  }

  getVal($event: any){
    let text = $event.target.options[$event.target.options.selectedIndex].value;
    console.log(text);
    this.loginForm.controls.userType.setValue(text);
  }

}
