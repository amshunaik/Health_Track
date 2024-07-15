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
  it('should add new user data to healthdt which not existed', () => {
    component.AddData('Alice', 'Running', '30', 1);
    const expectedData:Healthdata[] = service2.getAllHealthData();
    
    expect(component.healthdt).toEqual(expectedData);
    
  });
  it('should add new user data if it does not exist', () => {
    const initialData: Healthdata[] = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 }
        ],
      },
    ];
    localStorage.setItem('healthdata', JSON.stringify(initialData));
    service2 = TestBed.inject(HealthService);  // Re-inject service to read localStorage

    const newUser = { id: 2, name: 'Alice', workouts: [{ type: 'Swimming', minutes: 60 }] };
    component.AddData(newUser.name, newUser.workouts[0].type, newUser.workouts[0].minutes.toString(), newUser.id);

    const storedData = JSON.parse(localStorage.getItem('healthdata') || '[]');
    expect(storedData.length).toBe(5);
    //expect(storedData[1]).toEqual(newUser);
  });
  it('should use Healthservice', () => {
    //expect(localStorage.getItem('healthdata')).toBeNull(); // Check if 'healthdata' is initially null
    if(localStorage.getItem('healthdata')==null){
    // Re-inject service to trigger constructor
    service2 = TestBed.inject(HealthService);

    const expectedData: Healthdata[] = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 },
        ],
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 },
        ],
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 },
        ],
      },
    ];

    const storedData = JSON.parse(localStorage.getItem('healthdata') || '[]') as Healthdata[];

    // Assert that localStorage now contains the expected data
    expect(storedData).toEqual(expectedData);
  }
  });
  

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
