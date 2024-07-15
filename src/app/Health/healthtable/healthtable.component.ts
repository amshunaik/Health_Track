import { CommonModule } from '@angular/common';
import {AfterViewInit, ViewChild,Component,OnInit, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule,FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator ,MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Healthdata } from '../../healthdata';
import { HealthService } from '../../health.service';
import { Workout } from '../../healthdata';

@Component({
  selector: 'app-healthtable',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule,ReactiveFormsModule,MatSlideToggleModule,
    MatFormFieldModule, MatSelectModule,MatTableModule, FormsModule,MatPaginatorModule,MatPaginator],
  templateUrl: './healthtable.component.html',
  styleUrl: './healthtable.component.css'
})
export class HealthtableComponent implements OnInit, AfterViewInit {

  
  // Storing the main workout list data in healthdata
  healthdata:Healthdata[]=[];

  // Access and obtain an instance of HealthService from health.service.ts
  healthservice:HealthService=inject(HealthService);


  // user input to filter dataset
  searchbyusername= new FormControl('');
  selected = 'Running';
  selectedCategory: string = '';
  
  // Store the filteres dataset to be shown in the table (in frontend)
  filteredLocationList: Healthdata[] = [];
 
  // List of all the workout types stored in Activities list
  Activities=["Running","Swimming","Cycling","yoga","Meditation"];
  searchInput: string = '';
 
  // function to filter out the workout list table on the basis of the workout type/ searched by the user.
  filterItemsByCategory() {
    //console.log("Seleted category : ",this.selected)
    // if none of the type selected then show complete list
    if (this.selected === null) {
      this.filteredLocationList = this.healthdata; // Reset filter if no category selected

    // if a type seleted then filter out the list to be visible
    } else {
      this.filteredLocationList = this.healthdata.filter(data =>
        data.workouts.some(tp => tp.type.toLowerCase() === this.selected!.toLowerCase())
      );
      
    }
    
    this.dataSource.data=this.filteredLocationList;
    //console.log(this.filteredLocationList)
  }

    // function to filter out the workout list table on the basis of the username searched by the user.
    filterResults(text: string) {
      this.searchbyusername.valueChanges.subscribe(value => {
        let r=value;
        //console.log('searchbyusername:', value);
        if (r==''||r==null) {
          this.filteredLocationList = this.healthdata;
          //console.log("one")
          setTimeout(()=>{
            
          this.filteredLocationList = this.healthdata;
    
          },200)
          return;
        }
        this.filteredLocationList = this.healthdata.filter((data) =>
          data?.name.toLowerCase().includes(r.toLowerCase()),
        );
      });
      this.dataSource.data=this.filteredLocationList
    }

  // function to get and store different types of workout done by each person 
  getworktypes(work:Workout[]){
    let tp=[];
    for (var i = 0; i < work.length; i++) {
      tp.push(work[i].type);
    } 
    return tp;

  }
  // function to get total different types of workout done by each person 
  getworknumber(work:Workout[]){
    let tp=[];
    for (var i = 0; i < work.length; i++) {
      tp.push(work[i].type);
      
    }
    return tp.length;

  }
  // funtion to get total workout time of each person 
  getTotalTime(work:Workout[]){
    let total_time=0
    for (var i = 0; i < work.length; i++) {
      total_time+=work[i].minutes;
      
    }
    return total_time;

  }
  
  // attributes of the woukout table
  displayedColumns: string[] = ['name','workouts','numberOfWorkouts','totalWorkoutTime'];
  dataSource = new MatTableDataSource<any>

  // Pagination : Control the no of data to be showin in a single page 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.filteredLocationList);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  // The function and the code written in this contructor will be invoked automatically when an instance of that class is created. 
  constructor(){
    this.healthdata=this.healthservice.getAllHealthData();
    this.filteredLocationList = this.healthdata;
    //console.log("Data set :",this.dataSource);
    this.filterResults('');
 
  }


}
