import { Injectable } from '@angular/core';
import { Healthdata } from './healthdata';
@Injectable({
  providedIn: 'root'
})
export class HealthService {
  

  id1=4;
  // Getting the workout list from localstorage
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
 // Adding data in localStorage
  constructor() {
    let r=localStorage.getItem('healthdata');
    if(!r){
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
       
      ]));

    }
    

  }
}
