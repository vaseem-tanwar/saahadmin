import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {HelperService} from "../../../../services/helper.service";
import {FormsModule, FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ToastrService, Toast} from "ngx-toastr";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-restaurent-categories',
  templateUrl: './restaurent-categories.component.html',
  styleUrls: ['./restaurent-categories.component.css']
})
export class RestaurentCategoriesComponent implements OnInit {
  p: number = 1;
  list: any=[];
  // applicantForm = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  // });
  searchText: any = '';
  submitStatus: boolean = false;
  closeResult: any = '';
  delId: any;
  constructor(
    private location: Location,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
  }


  reset() {
    // this.applicantForm.reset();
    this.submitStatus = false;
  }

}
