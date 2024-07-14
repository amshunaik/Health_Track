import { Injectable } from '@angular/core';
import { Healthdata } from './healthdata';
@Injectable({
  providedIn: 'root'
})
export class HealthService {
  // Data:Healthdata[]=[
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     workouts: [
  //       { type: 'Running', minutes: 30 },
  //       { type: 'Cycling', minutes: 45 }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Smith',
  //     workouts: [
  //       { type: 'Swimming', minutes: 60 },
  //       { type: 'Running', minutes: 20 }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     name: 'Mike Johnson',
  //     workouts: [
  //       { type: 'Yoga', minutes: 50 },
  //       { type: 'Cycling', minutes: 40 }
  //     ]
  //   },
  //   {
  //     id: 1,
  //     name: 'cushio Doe',
  //     workouts: [
  //       { type: 'Running', minutes: 30 },
  //       { type: 'Cycling', minutes: 45 }
  //     ]
  //   },
  //   {
  //     id: 1,
  //     name: 'rohan Doe',
  //     workouts: [
  //       { type: 'Running', minutes: 30 },
  //       { type: 'Cycling', minutes: 45 }
  //     ]
  //   },
  //   {
  //     id: 1,
  //     name: 'Jotimhn Doe',
  //     workouts: [
  //       { type: 'Running', minutes: 30 },
  //       { type: 'Cycling', minutes: 45 }
  //     ]
  //   },
  // ];
  

  id1=4;
  getAllHealthData():Healthdata[]{
    let storedData = localStorage.getItem('healthdata');
    let parsedData
    if (storedData) {
      try {
        parsedData = JSON.parse(storedData);
        console.log("Data from localStorage:", parsedData);
      } catch (e) {
        //console.error("Error parsing JSON:", e);
      }
    } 
    return parsedData;

  }
  // submitApplication(name: string, workout_type: string, workout_time: string) {
  //   // console.log(
  //   //   `Homes application received: username: ${name}, workout_type: ${workout_type}, workout_time: ${workout_time}.`,
  //   // );
  //   let user1:Healthdata={
  //     id:this.id1,
  //     name:name,
  //     workouts:[
  //       {type:workout_type,minutes:parseInt(workout_time)}
  //     ]
  //   };
    
  //   const exists=this.Data.find(d=>d.name.toLowerCase()===user1.name.toLowerCase());
  //   console.log("uhgfcv : ",exists);
  //   if(!exists){
  //     this.Data.push(user1);
  //     this.id1++;
  //   }
  //   else{
  //     let g=exists.workouts.find(d=>d.type===user1.workouts[0].type);
  //         if(g){
  //           user1.workouts[0].minutes+=g.minutes;
  //           //console.log("updated user  :",user1);
  //           const index = exists.workouts.indexOf(g);
  //           if (index > -1) {
  //             exists.workouts.splice(index, 1);
  //           }
  //           //console.log("updated data : " ,exists)
  //         }

  //     exists.workouts.push(user1.workouts[0]);
  //     console.log("final ans : ",exists);
  //   }
    
  //   localStorage.setItem("healthdata",JSON.stringify(this.Data))
  //   console.log("Data stored : ",this.Data)
    
  // }

  constructor() {
    let r=localStorage.getItem('healthdata');
    if(r){
      localStorage.setItem('healthdata',JSON.stringify([
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 }
          ]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 }
          ]
        },
        {
          id: 1,
          name: 'cushio Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 1,
          name: 'rohan Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 1,
          name: 'Jotimhn Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
      ]));

    }
    

    //localStorage.setItem("healthdata",JSON.stringify(this.Data))
  }
}
