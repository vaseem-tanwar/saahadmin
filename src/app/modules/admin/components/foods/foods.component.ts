import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  catList: any =[];
  list: any =[];
  viewdetail: any = [];
  details: any = [];
  delId: any;
  detail: any;
  searchText: any = '';
  submitStatus: boolean = false;

  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    food_name: new FormControl('', [ Validators.required]),
    food_description: new FormControl('', [ Validators.required]),
    category_id: new FormControl('', [ Validators.required]),
    price: new FormControl('', [ Validators.required]),
    food_type: new FormControl('', [ Validators.required]),
    image: new FormControl(''),
  });
  constructor(private router: Router,
              public auth: AuthService,
              public toastr: ToastrService) { }

  ngOnInit(): void {
    this.auth.GETMETHOD('admin/foodCatogoryList').then((res: any) => {
      console.log(res);
      this.catList = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
    this.getUsers();
  }

  getUsers(){
    this.auth.GETMETHOD('admin/foodList').then((res: any) => {
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
    this.auth.POSTMETHOD('admin/foodIsactive',{'isActive': st, '_id': id}).then((res: any) => {
      console.log(res);
      this.getUsers();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }


  delVal(id: any){
    this.delId = id;
  }
  deleteApplicant(){
    this.auth.POSTMETHOD('admin/deleteFood', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.toastr.success(res.message, 'Success');
      this.getUsers();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  viewDetails(detail: any){
    this.viewdetail=detail;
    console.log(this.viewdetail.food_name);
  }
  reset() {
    this.applicantEditForm.reset();
    this.submitStatus = false;
  }
  getDetails(id: any){
    this.auth.POSTMETHOD('admin/foodDetailsById', {'food_id': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.food_name.setValue(this.details.food_name);
      this.applicantEditForm.controls.food_description.setValue(this.details.food_description);
      this.applicantEditForm.controls.food_type.setValue(this.details.food_type);
      this.applicantEditForm.controls.price.setValue(this.details.price);
      this.applicantEditForm.controls.category_id.setValue(this.details.category_id._id);
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  UpdateApplicant() {
    try {
      console.log(this.applicantEditForm.controls);
      // if (this.applicantEditForm.valid) {
      this.submitStatus = false;
      if (this.applicantEditForm.controls.food_name.value == '' || this.applicantEditForm.controls.food_name.value == undefined) {
        // this.toastr.error('Please select your profile image', 'Error');
        this.submitStatus = true;
      } else if (this.applicantEditForm.controls.food_type.value == '' || this.applicantEditForm.controls.food_type.value == undefined) {
        // this.toastr.error('Please select your guard licence', 'Error');
        this.submitStatus = true;
      } else if (this.applicantEditForm.controls.category_id.value == '' || this.applicantEditForm.controls.category_id.value == undefined) {
        // this.toastr.error('Please select your weapon licence', 'Error');
        this.submitStatus = true;
      } else if (this.applicantEditForm.controls.price.value == '' || this.applicantEditForm.controls.price.value == undefined) {
        // this.toastr.error('Please select your back ground checking file', 'Error');
        this.submitStatus = true;
      }else if (this.applicantEditForm.controls.food_description.value == '' || this.applicantEditForm.controls.food_description.value == undefined) {
        // this.toastr.error('Please select your back ground checking file', 'Error');
        this.submitStatus = true;
      } else {

        this.submitStatus = false;
        this.auth.POSTMETHOD('admin/updateFood',
          this.applicantEditForm.value
        ).then((res: any) => {
          console.log(res);
          // this.lists = res.data.result;
          if (res.success == true) {
            this.toastr.success(res.message, 'Success');
            // this.reset();
            this.getUsers();
          } else {
            this.toastr.error(res.message, 'Error');
          }
        }, error => {
          this.toastr.error(error['message'], 'Error');
        });
        // console.log(user);
      }
      // } else {
      //   this.submitStatus = true;
      // }

    } catch (error: any) {
      this.toastr.error(error['message'], 'Error!');
    }
  }


}
