import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {AuthService} from "../../../../services/auth.service";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  p: number = 1;
  list: any=[];
  applicantForm = new FormGroup({
    name: new FormControl('', [ Validators.required]),
    hours: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    description: new FormControl('', [ Validators.required]),
    location: new FormControl('', [ Validators.required]),
    image: new FormControl(''),
  });
  applicantEditForm = new FormGroup({
    name: new FormControl('', [ Validators.required]),
    hours: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    description: new FormControl('', [ Validators.required]),
    location: new FormControl('', [ Validators.required]),
    image: new FormControl(''),
  });
  searchText: any = '';
  submitStatus: boolean = false;
  closeResult: any = '';
  delId: any;


  constructor(
    private location: Location,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) {

  }

  async createApplicant() {
    try {
      console.log(this.applicantForm.controls.hours.value);
      if (this.applicantForm.valid) {
        this.submitStatus = false;
        if (this.applicantForm.controls.name.value == '' || this.applicantForm.controls.name.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.hours.value == '' || this.applicantForm.controls.hours.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.phone.value == '' || this.applicantForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.location.value == '' || this.applicantForm.controls.location.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        }else if (this.applicantForm.controls.description.value == '' || this.applicantForm.controls.description.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHODSECURE('admin/addRestaurant',
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
    this.submitStatus = false;
  }
  ngOnInit(): void {
    this.getList();
  }

  getList(){
    let owner =  localStorage.getItem('saah_user_id');
    this.auth.POSTMETHOD('admin/restaurantListById',{owner_id: owner}).then((res: any) => {
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

  foodList(id:any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "restaurantId": id
      }
    };
    this.router.navigate(['/restaurant-owner/foods'],navigationExtras);
  }

}
