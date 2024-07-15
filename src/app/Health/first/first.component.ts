import { CommonModule } from '@angular/common';
import { Component ,inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { HealthService } from '../../health.service';
import {MatSelectModule} from '@angular/material/select';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Healthdata } from '../../healthdata';
@Component({
  selector: 'app-first',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,RouterModule,MatFormFieldModule, MatInputModule,MatSelectModule],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css'
})
export class FirstComponent {
  
  // List of all the workout types stored in Activities list
  Activities=["Running","Swimming","Cycling","yoga","Meditation"];
 
  // form control to capture the value, and other valuable insights
  username1=new FormControl('');
  workouttime=new FormControl('');
  workouttype=''; 
  
  // Access and obtain an instance of HealthService from health.service.ts
  healthservice: HealthService = inject(HealthService);
  healthdt:Healthdata[]=[];
///////////////////////////////////////////////////////////////////////////////////////////
constructor(){
  
  
  this.healthdt=this.healthservice.getAllHealthData();
  
}
// Adding conditions to manage the data and storing in localstorage
AddData(name: string, workout_type: string, workout_time: string,id1: number) {
    
    // user has newly created workout plan from user
    let user1:Healthdata={
      id:id1,
      name:name,
      workouts:[
        {type:workout_type,minutes:parseInt(workout_time)}
      ]
    };
    // Checking if the person already present in the workout list
    const exists=this.healthdt.find(d=>d.name.toLowerCase()===user1.name.toLowerCase());
    //console.log("exist  : ",exists);
    // if not exists then add the newly created data
    if(!exists){
      this.healthdt.push(user1);
      //id1++;
    }
    // if not exists then check weather the type which is added in user1 is present or not 
    // if not present then push in workouts list
    // if present then increase the workout time (add the time)
    else{
      let g=exists.workouts.find(d=>d.type===user1.workouts[0].type);
          // if present then increase the workout time (add the time)

          if(g){
            user1.workouts[0].minutes+=g.minutes;
            const index = exists.workouts.indexOf(g);
            if (index > -1) {
              exists.workouts.splice(index, 1);
            }
          }
      
      exists.workouts.push(user1.workouts[0]);
      //console.log("final ans : ",exists);
    }
    
    
    localStorage.setItem("healthdata",JSON.stringify(this.healthdt))
    let r=this.healthservice.getAllHealthData();
    console.log(r)
    return this.healthdt;
    //console.log("Data stored : ",this.healthdt)
    //console.log("Final data : - " ,localStorage.getItem('healthdata'))
    
  }
  // Function to add the workout plan of a person/user into the HealthService list 
  submitData(): Healthdata[] | undefined {
    if (!this.username1.value || !this.workouttime.value || !this.workouttype) {
      alert('Please fill all details');
      return;
    }

    let ind = this.healthdt.length;
    let id1 = ind;

    this.AddData(this.username1.value, this.workouttype, this.workouttime.value, id1);

    this.username1.setValue('');
    this.workouttime.setValue('');
    this.workouttype = '';

    return this.healthdt;
  }
}

  


