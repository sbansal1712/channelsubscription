import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';



@Component({
  selector: 'app-addNewMeal',
  templateUrl: './addNewMeal.component.html',
  styleUrls: ['./addNewMeal.component.scss']
})
export class AddNewMealComponent implements OnInit  {
  datesubmitted: boolean;
  dateSubmitted: boolean;
  totalCalorie: any;
  currentUser: any;
  mealIndex: any;
  fromDate: any = undefined;


  
  constructor( private formBuilder: FormBuilder, private dataService : DataService, private router : Router, private activatedRoute : ActivatedRoute){
    
      this.currentUser = this.dataService.currentUser
      this.mealIndex = this.dataService.mealIndex
      //return this.dataService.currentUser
  
    
  }
  mealForm: FormGroup;
  submitForm : FormGroup;
  mealSubmitted: boolean = false;
  editable = false;
  ngOnInit(){
    this.getTransactionData()
    this.mealForm = this.formBuilder.group({
      MealName: ["", Validators.required],
      Calories: ["", Validators.required],
     
    });
    this.submitForm = this.formBuilder.group({
      Date: ["", Validators.required],
     
    });
  }
  displayedColumns: string[] = ['item', 'calorie', 'action'];
  
  transactions: any[] = [
  
     
    
  ];
  dataSource = new MatTableDataSource<Element>(this.transactions);


  /** Gets the total calorie of all transactions. */
  getTotalcalorie() {
    this.totalCalorie = this.transactions.map(t => t.calorie).reduce((acc, value) => acc + value, 0);
    return this.totalCalorie
  }
  delete(i){
    this.transactions.splice(i,1);
    
    this.dataSource = new MatTableDataSource<Element>(this.transactions);
    
  }
  edit(e){
    e.stopPropagation()
    this.editable = !this.editable
  }
  savedata(){
    this.dateSubmitted = true;
    if(this.submitForm.invalid || this.transactions.length == 0){
      return;
    }
    else{
      const newMeal = {
        Date : this.submitForm.get("Date").value,
        totalCalorie : this.totalCalorie,
        DailyMeals : this.transactions
      }
      
    
      if(this.currentUser.Meals == undefined || this.currentUser.Meals.length == 0){
        this.currentUser.Meals = []
        this.currentUser.Meals.push(newMeal)
      }
      else if(this.currentUser.Meals.length > 0 && this.mealIndex != undefined){
        this.currentUser.Meals[this.mealIndex] = newMeal;
      }
      else{
        this.currentUser.Meals.push(newMeal)
      }
  
      
      this.dataService.updateMeals({
        Username : this.currentUser.Username,
        Meals : this.currentUser.Meals

      }).subscribe((data : any) => {
        this.router.navigate(["/home"])
      } )
      
    }
  }

  submitMeal(){
    this.mealSubmitted = true;

    if (this.mealForm.invalid) {
      return;
    } else {
      this.mealSubmitted = false;
      const mealdetail = {
        item: this.mealForm.get("MealName").value,
       
        calorie: this.mealForm.get("Calories").value,
     
        
      };
      this.transactions.push(mealdetail)
      
     
      this.mealForm.reset()
      
    
      
      this.dataSource = new MatTableDataSource<Element>(this.transactions);


      // this.dataService.createNewUser(userdetail).subscribe((data: any) => {
      //   this.loggedInUser = data;
        
      //  // this.router.navigate(["/home"]);
      // });
    }
    //this.registrationsuccess = true;
  }
  getTransactionData(){

    if(this.activatedRoute.snapshot.url[0].path == "addNewMeal"){
      this.mealIndex = undefined
    }
    if(this.currentUser == undefined){
        this.dataService.getLoggedInName.next(undefined)
        sessionStorage.clear()
        this.router.navigate(["register"])
      
    }

    else if(this.mealIndex != undefined){
      
      this.transactions = this.currentUser.Meals[this.mealIndex].DailyMeals
      this.dataSource = new MatTableDataSource<Element>(this.transactions);
      this.fromDate = this.currentUser.Meals[this.mealIndex].Date
      
    }
  }
}
