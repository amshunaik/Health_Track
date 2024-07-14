import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RouterModule} from '@angular/router';
import { FirstComponent } from './Health/first/first.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HealthService } from './health.service';
import { Healthdata } from './healthdata';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FirstComponent,MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  healthdata:Healthdata[]=[];
  healthservice: HealthService = inject(HealthService);


  title = 'Demo';
  
  constructor(){
    this.healthdata=this.healthservice.getAllHealthData();

    localStorage.setItem("healthdata",JSON.stringify(this.healthdata))

    //console.log(" Title : ",this.title);
    
  }
}
