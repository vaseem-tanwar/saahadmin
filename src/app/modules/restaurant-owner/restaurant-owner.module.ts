import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantOwnerRoutingModule } from './restaurant-owner-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RestaurantsComponent} from "./components/restaurants/restaurants.component";
import { FoodsComponent} from "./components/foods/foods.component";
import { DesignMapComponent } from './components/design-map/design-map.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RestaurantsComponent,
    FoodsComponent,
    DesignMapComponent,
    HeaderComponent,
    FooterComponent,
    LeftmenuComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RestaurantOwnerRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class RestaurantOwnerModule { }
