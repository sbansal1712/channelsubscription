import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AddNewMealComponent } from "./addNewMeal/addNewMeal.component";

import { RegisterComponent } from "./register/register.component";
import { BrowseChannelsComponent } from './browse-channels/browse-channels.component';


const routes: Routes = [
  { path: "", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "browse", component: BrowseChannelsComponent },
  { path: "existingmeal", component: AddNewMealComponent },
  { path: "register", component: RegisterComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
