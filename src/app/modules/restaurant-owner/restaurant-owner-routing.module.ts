import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NotFoundComponent} from "../../components/not-found/not-found.component";
import {DesignMapComponent} from "./components/design-map/design-map.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RestaurantsComponent} from "./components/restaurants/restaurants.component";
import {FoodsComponent} from "./components/foods/foods.component";
import {OrdersComponent} from "./components/orders/orders.component";

const routes: Routes = [  {path: '', component: DesignMapComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'foods', component: FoodsComponent},
    {path: 'restaurant-orders', component: OrdersComponent},
    {path: '', redirectTo: '/restaurant-owner/dashboard', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantOwnerRoutingModule { }
