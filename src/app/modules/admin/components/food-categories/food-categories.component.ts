import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

declare var $: any;
@Component({
  selector: 'app-food-categories',
  templateUrl: './food-categories.component.html',
  styleUrls: ['./food-categories.component.css']
})
export class FoodCategoriesComponent implements OnInit {

  p: number = 1;
  list: any=[];
  details: any=[];
  applicantForm = new FormGroup({
    category_name: new FormControl('', [ Validators.required]),
    profileImage: new FormControl(''),
  });
  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    category_name: new FormControl('', [ Validators.required]),
    profileImage: new FormControl(''),
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
      console.log(this.applicantForm);
      if (this.applicantForm.valid) {
        this.submitStatus = false;
        if (this.applicantForm.controls.category_name.value == '' || this.applicantForm.controls.category_name.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        }  else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/addfoodCategory',
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
    this.auth.GETMETHOD('admin/foodCatogoryList').then((res: any) => {
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
    this.auth.POSTMETHOD('admin/foodCategoryIsactive',{'isActive': st, '_id': id}).then((res: any) => {
      console.log(res);
      this.getList();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  getDetails(id: any){
    this.auth.POSTMETHOD('admin/getFoodCategoryById', {'_id': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.category_name.setValue(this.details.category_name);
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  async UpdateApplicant() {
    try {
      console.log(this.applicantEditForm);
      if (this.applicantEditForm.valid) {
        this.submitStatus = false;
        if (this.applicantEditForm.controls.category_name.value == '' || this.applicantEditForm.controls.category_name.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/updateFoodCategory',
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
    this.auth.POSTMETHOD('admin/deleteFoodCategory', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.getList();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }


}
