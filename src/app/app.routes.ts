import { Routes } from '@angular/router';
import { FirstComponent } from './Health/first/first.component';
import { HealthtableComponent } from './Health/healthtable/healthtable.component';
import { VisualizationComponent } from './Health/visualization/visualization.component';
export const routes: Routes = [
    {
      path: '',
      component: FirstComponent,
      title: 'First page',
    },
    {
      path: 'table',
      component: HealthtableComponent,
      title: 'Health table',
    },
    {
      path: 'graph',
      component: VisualizationComponent,
      title: 'Home page',
    },
    
    ];
  

