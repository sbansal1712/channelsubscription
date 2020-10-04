import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Moment } from "moment";
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-channels',
  templateUrl: './browse-channels.component.html',
  styleUrls: ['./browse-channels.component.scss']
})
export class BrowseChannelsComponent implements OnInit {
  channels: any = [];
  public selectedMoments: Date;
  datePickerInput;
  selected: { startDate: Moment; endDate: Moment };
  TotalCost: any;
  minDate = new Date()

  constructor(private dataService : DataService, private router : Router) { 
 
    
    
  }

  ngOnInit() {
    if(this.dataService.currentUser == undefined){
      this.router.navigate(["register"])
    }
    else{
      this.getAllChannels()
    }
    
  
  }
  getAllChannels(){
    this.dataService.getAllChannels().subscribe((data => {
      this.channels = data
      this.TotalCost = 0
      this.channels.forEach((channel) => {
        console.log(channel)
       for(let i in this.dataService.currentUser.Channels){
         if(this.dataService.currentUser.Channels[i].ChannelID == channel.ChannelID){
           channel.subscribed = true;
           channel.Is_Active= this.dataService.currentUser.Channels[i].Is_Active
           channel.selectedMoments = this.dataService.currentUser.Channels[i].selectedMoments
           channel.totalCost = this.dataService.currentUser.Channels[i].totalCost
           this.TotalCost += channel.totalCost
           break;
         }
       }
      })

    }))
    
   
  }

  



  assignDate(i)
  {
    this.channels[i].startDate = this.channels[i].selectedMoments[0]
    this.channels[i].endDate = this.channels[i].selectedMoments[1]
    this.channels[i].totalCost =((this.channels[i].endDate - this.channels[i].startDate)/86400000) * this.channels[i].PerDayCostinINR
    this.TotalCost = 0
    this.channels.forEach((channel) => {
      if(channel.totalCost != undefined){
        this.TotalCost += channel.totalCost
      }
      
    })
  }

  pause(i:number){

    this.channels[i].Is_Active = false;
    this.dataService.updateChannels({Username : this.dataService.currentUser.Username, Channels : this.channels[i], Is_Active : false}).subscribe((data:any) => {
      this.channels[i].subscribed = true;
      this.dataService.currentUser.Channels.push(this.channels[i]) 
    })   
  }
  resume(i:number){

    if(this.channels[i].startDate != undefined){
       this.channels[i].Is_Active = true;
    this.dataService.updateChannels({Username : this.dataService.currentUser.Username, Channels : this.channels[i]}).subscribe((data:any) => {
      this.channels[i].subscribed = true;
      this.dataService.currentUser.Channels.push(this.channels[i]) 
    })
    }
    else{
      this.dataService.openErrorSnackBar("Please select subscription period", "");
    }    
  }
  Subscribe(i:number){

    if(this.channels[i].startDate != undefined){
       this.channels[i].Is_Active = true;
    this.dataService.updateChannels({Username : this.dataService.currentUser.Username, Channels : this.channels[i]}).subscribe((data:any) => {
      this.channels[i].subscribed = true;
      this.dataService.currentUser.Channels.push(this.channels[i]) 
    })
    }
    else{
      this.dataService.openErrorSnackBar("Please select subscription period", "");
    }    
  }

}
