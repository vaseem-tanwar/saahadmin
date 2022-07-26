import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';
import { UsersComponent } from './components/users/users.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { ResturentsComponent } from './components/resturents/resturents.component';
import { CoachesComponent } from './components/coaches/coaches.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { CmsComponent } from './components/cms/cms.component';
import { FoodsComponent } from './components/foods/foods.component';
import { RestaurentCategoriesComponent } from './components/restaurent-categories/restaurent-categories.component';
import { FoodCategoriesComponent } from './components/food-categories/food-categories.component';
import { FoodPricingComponent } from './components/food-pricing/food-pricing.component';
import { RestaurantOwnersComponent } from './components/restaurant-owners/restaurant-owners.component';
import { DriversComponent } from './components/drivers/drivers.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    LeftmenuComponent,
    UsersComponent,
    HomeDashboardComponent,
    ResturentsComponent,
    CoachesComponent,
    AdminProfileComponent,
    CmsComponent,
    FoodsComponent,
    RestaurentCategoriesComponent,
    FoodCategoriesComponent,
    FoodPricingComponent,
    RestaurantOwnersComponent,
    DriversComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    })
  ]
})
export class AdminModule { }
