import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LocationStrategy , PathLocationStrategy} from "@angular/common";
import {LoginComponent} from "./components/login/login.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: ()=>
      import('./modules/admin/admin.module').then((m)=>m.AdminModule)},
  {path: 'restaurant-owner',
    canActivate: [AuthGuard],
    loadChildren: ()=>
      import('./modules/restaurant-owner/restaurant-owner.module').then((m)=>m.RestaurantOwnerModule)},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
