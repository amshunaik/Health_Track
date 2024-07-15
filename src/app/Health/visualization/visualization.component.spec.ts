import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationComponent } from './visualization.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HealthService } from '../../health.service';

describe('VisualizationComponent', () => {
  let component: VisualizationComponent;
  let fixture: ComponentFixture<VisualizationComponent>;
  let service2: HealthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationComponent,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: HealthService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '123' }) // Mock paramMap with necessary values
            }
          }
        }
      ]
    })
    .compileComponents();
    service2 = TestBed.inject(HealthService);


    fixture = TestBed.createComponent(VisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize healthdata from the health service', () => {
    expect(component.healthdata.length).toBe(4);
  });

  it('should filter data and set up chart data when a person is selected', () => {
    component.Selectedperson = { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] };
    component.onPersonChange();
    
    expect(component.basicData.labels).toEqual(['Swimming', 'Running']);
    expect(component.basicData.datasets[0].data).toEqual([60, 20]);

    expect(component.ActualData[0].name).toBe('Jane Smith');
  });
  it('should return the selected person\'s name in getSelectedPersonplot', () => {
    component.Selectedperson = { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] };
    expect(component.getSelectedPersonplot()).toBe('John Doe\'s workout progress');
    
    
    //expect(component.getSelectedPersonplot()).toBe('No person selected');
  });
  
  
});
