import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { MatCardModule } from "@angular/material/card";
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatInputModule } from "@angular/material/input";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  OWL_DATE_TIME_FORMATS
} from "ng-pick-datetime";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { AddNewMealComponent } from "./addNewMeal/addNewMeal.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterComponent } from "./register/register.component";

import { AppMaterialModule } from './material-module';
import { AddNewChannelComponent } from './add-new-channel/add-new-channel.component';
import { BrowseChannelsComponent } from './browse-channels/browse-channels.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material/daterangepicker.module';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  },
  datePickerInput: { year: "numeric", month: "short", day: "numeric" },
  timePickerInput: { hour: "numeric", minute: "numeric" },
  monthYearLabel: { year: "numeric", month: "short" },
  dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
  monthYearA11yLabel: { year: "numeric", month: "long" }
};


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AddNewMealComponent,

    RegisterComponent,

    AddNewChannelComponent,

    BrowseChannelsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
    // MatCardModule,
    // MatFormFieldModule,
    // MatInputModule,
   
  ],
  providers: [
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
