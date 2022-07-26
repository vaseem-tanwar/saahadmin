import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {AuthService} from "../../../../services/auth.service";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  p: number = 1;
  catList: any=[];
  list: any=[];
  details: any=[];
  viewdetail: any=[];
  applicantForm = new FormGroup({
    food_name: new FormControl('', [ Validators.required]),
    food_description: new FormControl('', [ Validators.required]),
    category_id: new FormControl('', [ Validators.required]),
    restaurant_id: new FormControl('', [ Validators.required]),
    price: new FormControl('', [ Validators.required]),
    food_type: new FormControl('', [ Validators.required]),
    // image: new FormControl(''),
  });
  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    food_name: new FormControl('', [ Validators.required]),
    food_description: new FormControl('', [ Validators.required]),
    category_id: new FormControl('', [ Validators.required]),
    // restaurant_id: new FormControl('', [ Validators.required]),
    price: new FormControl('', [ Validators.required]),
    food_type: new FormControl('', [ Validators.required]),
    image: new FormControl(''),
  });
  searchText: any = '';
  submitStatus: boolean = false;
  closeResult: any = '';
  delId: any;
  restaurantId: any;


  constructor(
    private location: Location,
    private router: Router,
    private activeroute: ActivatedRoute,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) {
    this.activeroute.queryParams.subscribe(params => {
      this.restaurantId = params["restaurantId"];
      this.applicantForm.controls.restaurant_id.setValue(this.restaurantId);
      this.getList();
    });

  }

  async createApplicant() {
    try {
      console.log(this.applicantForm.controls.category_id.value);
      console.log(this.applicantForm.controls.restaurant_id.value);
      console.log(this.applicantForm.controls.food_type.value);
      // if (this.applicantForm.valid) {
        this.submitStatus = false;
        if (this.applicantForm.controls.food_name.value == '' || this.applicantForm.controls.food_name.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.restaurant_id.value == '' || this.applicantForm.controls.restaurant_id.value == undefined) {
          this.toastr.error('Restaurant Id Invalid', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.food_type.value == '' || this.applicantForm.controls.food_type.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.category_id.value == '' || this.applicantForm.controls.category_id.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.price.value == '' || this.applicantForm.controls.price.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        }else if (this.applicantForm.controls.food_description.value == '' || this.applicantForm.controls.food_description.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          this.auth.POSTMETHOD('admin/addFood',
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
      // } else {
      //   this.submitStatus = true;
      // }

    } catch (error: any) {
      this.toastr.error(error['message'], 'Error!');
    }
  }

  reset() {
    this.applicantForm.reset();
    this.submitStatus = false;
  }
  ngOnInit(): void {
    this.auth.GETMETHOD('admin/foodCatogoryList').then((res: any) => {
      console.log(res);
      this.catList = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  getList(){
    let owner =  localStorage.getItem('saah_user_id');
    this.auth.POSTMETHOD('admin/foodListByRestaurant',{'restaurant_id': this.restaurantId}).then((res: any) => {
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
      this.toastr.success('Status Updated Successfully', 'Success');
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
    this.auth.POSTMETHOD('admin/deleteFood', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.getList();
      this.toastr.success(res.message, 'Success');
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  viewDetails(detail: any){
    this.viewdetail=detail;
    console.log(this.viewdetail.food_name);
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
      // } else {
      //   this.submitStatus = true;
      // }

    } catch (error: any) {
      this.toastr.error(error['message'], 'Error!');
    }
  }


}
