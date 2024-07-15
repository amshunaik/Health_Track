import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HealthService } from '../../health.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { FirstComponent } from './first.component';
import { of } from 'rxjs';
import { Healthdata } from '../../healthdata';

describe('FirstComponent', () => {
  let component: FirstComponent;
  let fixture: ComponentFixture<FirstComponent>;
  let service2: HealthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FirstComponent,
        RouterTestingModule,
        BrowserAnimationsModule // Add necessary modules here
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
    .compileComponents(); // Compile components asynchronously
    
    service2 = TestBed.inject(HealthService);
    let Heal=localStorage.getItem('healthdata');

    fixture = TestBed.createComponent(FirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should Add the data', fakeAsync(() => {
    spyOn(component, 'AddData').and.callThrough();
  
    let updatedData;
  
    // Call AddData method
    const r=component.AddData('Ramesh', 'Running', '60', 8);
   
    console.log("kk : ",r);
  
    // Simulate passage of time until asynchronous operations complete
    tick(1000);
  
    // Retrieve the updated data
    let yp,pl
    pl = service2.getAllHealthData();
    
    console.log("data given : ",pl)
    expect(r).toEqual(pl);
  }));
  

  it('should add new health data when submitData is called', () => {
    component.username1.setValue('Ramesh');
    component.workouttype = 'Running';
    component.workouttime.setValue('60');

    const updatedData = component.submitData();
    console.log("jhnm ",updatedData)
    const expectedData:Healthdata[] = service2.getAllHealthData();
    
    expect(updatedData).toEqual(expectedData);
  });

  it('should alert and return undefined if any field is empty', () => {
    spyOn(window, 'alert');
    component.username1.setValue('');
    component.workouttime.setValue('');
    component.workouttype = '';

    const result = component.submitData();

    expect(window.alert).toHaveBeenCalledWith('Please fill all details');
    expect(result).toBeUndefined();
  });
  
  
});
