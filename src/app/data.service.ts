import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap, catchError } from "rxjs/operators";
import { of, Subject, throwError } from "rxjs";
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: "root",
})
export class DataService {

  //apiUrl = "http://localhost:5000/";
  apiUrl = "https://channelsubscriptionserver.herokuapp.com/";
  currentUser: any;
  public getLoggedInName = new Subject();
  mealIndex: any;
  //apiUrl = "https://ad-management.herokuapp.com/";
  constructor(private http: HttpClient, private snackbar : MatSnackBar) {}


  openErrorSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      panelClass: ["red-snackbar"],
      verticalPosition: "top",
      horizontalPosition: "center",
    });
  }

  openSuccessSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      panelClass: ["blue-snackbar"],
      verticalPosition: "top",
      horizontalPosition: "center",
    });
  }
  getAllChannels() {
    return this.http.get(`${this.apiUrl}getAllChannels`);
  }
  updateChannels(channel){
    return this.http.post(`${this.apiUrl}updateChannels`, channel)

  }
  createNewUser(userdetail: any) {
    return this.http.post(`${this.apiUrl}createNewUser`, userdetail).pipe(
      switchMap((user: any) => {
        //alert("User created successfully");
        return of(user);
      }),
      catchError((ex: any) => {
        console.log(`server error occured`, ex);
        return throwError(`User Creation failed, please contact to admin`);
      })
    );
  }

  signIn(userdetail: any) {
    
    return this.http.post(`${this.apiUrl}signIn`, userdetail)
    
    
  }
 updateMeals(mealDetails : any) {
  
   return this.http.post(`${this.apiUrl}updateUser`, mealDetails)
 }

}
