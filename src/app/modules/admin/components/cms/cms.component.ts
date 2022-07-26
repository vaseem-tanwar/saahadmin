import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {FormsModule, FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {Location} from "@angular/common";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";
import { Editor, Toolbar } from 'ngx-editor';

declare var $: any;
@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {

  p: number = 1;
  list: any=[];
  details: any=[];
  viewdetail: any=[];
  editor: any;
  editor1: any;
  applicantForm = new FormGroup({
    cms_name: new FormControl('', [ Validators.required]),
    cms_description: new FormControl('', [ Validators.required]),
  });
  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    cms_name: new FormControl('', [ Validators.required]),
    cms_description: new FormControl('', [ Validators.required]),
  });
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  searchText: any = '';
  submitStatus: boolean = false;
  config ={ placeholder: '', tabsize: 2, height: 100, uploadImagePath: '', toolbar:
      [ // [groupName, [list of button]] ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['bold',
        'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']], ['para', ['style', 'ul', 'ol',
        'paragraph', 'height']], ['insert', ['table', 'picture', 'link', 'video',
        'hr']] ], fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS',
      'Courier New', 'Roboto', 'Times'] }


  constructor(
    private location: Location,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) {
    // let aa= document.getElementById('summernote');
    // aa.summernote();
  }

  reset() {
    this.applicantForm.reset();
    this.applicantEditForm.reset();
    this.submitStatus = false;
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.editor1 = new Editor();
    // $('#summernote').summernote();
    this.getList();
  }

  getList(){
    this.auth.GETMETHOD('admin/allCMSList').then((res: any) => {
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
    this.auth.POSTMETHOD('admin/cmsIsactive',{'isActive': st, '_id': id}).then((res: any) => {
      console.log(res);
      this.getList();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  getDetails(id: any){
    this.auth.POSTMETHOD('admin/getCMSDetsilsById', {'_id': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.cms_name.setValue(this.details.cms_name);
      this.applicantEditForm.controls.cms_description.setValue(this.details.cms_description);
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  async UpdateApplicant() {
    try {
      console.log(this.applicantEditForm.controls.cms_name.value);
      if (this.applicantEditForm.valid) {
        this.submitStatus = false;
        if (this.applicantEditForm.controls.cms_name.value == '' || this.applicantEditForm.controls.cms_name.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.cms_description.value == '' || this.applicantEditForm.controls.cms_description.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/updateCMS',
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

  async createApplicant() {
    try {
      console.log(this.applicantForm.controls.cms_name.value);
      // if (this.applicantForm.valid) {
        this.submitStatus = false;
        if (this.applicantForm.controls.cms_name.value == '' || this.applicantForm.controls.cms_name.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.cms_description.value == '' || this.applicantForm.controls.cms_description.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/addCMS',
            this.applicantForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.success == true) {
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
      // } else {
      //   this.submitStatus = true;
      // }

    } catch (error: any) {
      this.toastr.error(error['message'], 'Error!');
    }
  }


}
