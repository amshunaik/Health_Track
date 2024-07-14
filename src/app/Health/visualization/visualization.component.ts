import { Component,inject,OnInit } from '@angular/core';
import { Healthdata, Workout } from '../../healthdata';
import { HealthService } from '../../health.service';
import { ChartModule } from 'primeng/chart';

import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-visualization',
  standalone: true,
  imports: [CommonModule,FormsModule, ListboxModule,ChartModule, NgxEchartsModule],
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.css'
})
export class VisualizationComponent  {
    // Storing the main workout list data in healthdata
  healthdata:Healthdata[]=[];
  Data:Healthdata[]=[];
  ActualData:Healthdata[]=this.healthdata;

    // Access and obtain an instance of HealthService from health.service.ts
  healthservice:HealthService=inject(HealthService);
  
  // Getting the person's name been seleted by user whose plot he/she wants to see
  Selectedperson!: Healthdata;
  
  ///////////////////// Grap section //////////////////////////////
  // variable to store data
  basicData: any;
  basicOptions: any;
  // printing the person name whose progress we want to see.
  getSelectedPersonplot(): string {
    return this.Selectedperson ? `${this.Selectedperson.name}'s workout progress` : 'No person selected';
  }

  // Storing the dataset which will be used to plot the graph and to visualize progress.
  onPersonChange(){
    if (this.Selectedperson) {
      this.ActualData = this.healthdata.filter(data =>
        data?.name.toLowerCase().includes(this.Selectedperson!.name.toLowerCase())
      );
    } 

    console.log(this.ActualData);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    // actual dataset to be used , storing labels, datasets( time taken for performing differnt types of workout)

    let label1=this.ActualData[0].workouts;
    console.log("kk : ",label1)
    let p=[];
    let mins=[];
    for (let x=0;x<label1.length;x++){
      p.push(label1[x].type);
      mins.push(label1[x].minutes);

    }
    // controlling the graph layouyt and  setting up data for a chart (used chart.js library)
    this.basicData = {
        labels: p,
        datasets: [
            {
                label: 'Minutes',
                data: mins,
                backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgb(255, 159, 64)'],
                borderWidth: 1
            }
        ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      responsive: true,

      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            display: true,
            //color: surfaceBorder,
            drawBorder: true,
            drawOnChartArea: true // To draw on chart area

          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            display: true,
           color: surfaceBorder,
            drawBorder: true,
            drawOnChartArea: true // To draw on chart area

          }
        }
      }
    };
  }
  // The function and the code written in this contructor will be invoked automatically when an instance of that class is created. 

constructor(){
   
   //let x=localStorage.getItem('healthdata');
   //console.log("king : ",x)
   this.healthdata=this.healthservice.getAllHealthData();
   console.log("data : ",this.healthdata)
   this.Data=this.healthdata
}
  }


 
  
  
