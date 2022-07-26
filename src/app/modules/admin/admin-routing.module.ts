import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {UsersComponent} from "./components/users/users.component";
import {HomeDashboardComponent} from "./components/home-dashboard/home-dashboard.component";
import {ResturentsComponent} from "./components/resturents/resturents.component";
import {NotFoundComponent} from "../../components/not-found/not-found.component";
import {CoachesComponent} from "./components/coaches/coaches.component";
import {FoodsComponent} from "./components/foods/foods.component";
import {RestaurantOwnersComponent} from "./components/restaurant-owners/restaurant-owners.component";
import {DriversComponent} from "./components/drivers/drivers.component";
import {RestaurentCategoriesComponent} from "./components/restaurent-categories/restaurent-categories.component";
import {FoodCategoriesComponent} from "./components/food-categories/food-categories.component";
import {AdminProfileComponent} from "./components/admin-profile/admin-profile.component";
import {CmsComponent} from "./components/cms/cms.component";

const routes: Routes = [
  {path: '', component: AdminDashboardComponent, children: [
      {path: 'admin-profile', component: AdminProfileComponent},
      {path: 'dashboard', component: HomeDashboardComponent},
      {path: 'users', component: UsersComponent},
      {path: 'restaurant-owners', component: RestaurantOwnersComponent},
      {path: 'restaurants', component: ResturentsComponent},
      {path: 'restaurant-category', component: RestaurentCategoriesComponent},
      {path: 'trainers', component: CoachesComponent},
      {path: 'foods', component: FoodsComponent},
      {path: 'food-categories', component: FoodCategoriesComponent},
      {path: 'delivery-executives', component: DriversComponent},
      {path: 'cms', component: CmsComponent},
      {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
      {path: '**', component: NotFoundComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
