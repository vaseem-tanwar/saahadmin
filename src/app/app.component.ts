import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'saaahadmin';

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        let userId = localStorage.getItem('saah_user_id');
        let access_token = localStorage.getItem('saah_Access_Token');
        // let parent = localStorage.getItem("parent");
        if((userId == null  || userId == '' || userId == undefined)
          && (access_token == null  || access_token == '' || access_token == undefined)
          // && (parent == null  || parent == '' || parent == undefined)
        ){
          localStorage.clear();
          this.router.navigate(['/login']);
        }else {
          let type = localStorage.getItem('saah_user_type');
          if (access_token){
            if (type =='SUPER_ADMIN') {
              this.router.navigate(['admin']);
            }else if (type == 'RESTAURANTOWNER') {
              this.router.navigate(['restaurant-owner']);
            } else {}
          }
        }
      }else {
        this.router.navigate(['login']);
      }
    });
  }

}
