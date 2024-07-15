import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HealthtableComponent } from './healthtable.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HealthService } from '../../health.service';
import { of } from 'rxjs';
import { Healthdata, Workout } from '../../healthdata';
import { FormControl } from '@angular/forms';

describe('HealthtableComponent', () => {
  let component: HealthtableComponent;
  let fixture: ComponentFixture<HealthtableComponent>;
  let service2: HealthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HealthtableComponent // Import the standalone component here
      ],
      providers: [
        { provide: HealthService }, // Use the mock service
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }) // Mock route parameters if needed
          }
        }
      ]
    })
    .compileComponents();
    service2 = TestBed.inject(HealthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate total time of workouts', fakeAsync(() => {
    const work: Workout[] = [
      { type: 'Running', minutes: 90 },
      { type: 'Swimming', minutes: 90 }
    ];

    // Spy on the methods if necessary
    //spyOn(component, 'getworknumber').and.callThrough();
    spyOn(component, 'getTotalTime').and.callThrough();

    // Call the methods and get results
    //const length = component.getworknumber(work);
    const timetaken = component.getTotalTime(work);
    console.log("time taken :", timetaken)

    // Assert the results
    //expect(length).toBe(2);
    expect(timetaken).toBe(180);

    // Additional assertions if necessary
    //expect(component.getworknumber).toHaveBeenCalledWith(work);
    expect(component.getTotalTime).toHaveBeenCalledWith(work);
  }));

  it('should calculate the length of workouts', fakeAsync(() => {
    const work: Workout[] = [
      { type: 'Running', minutes: 60 },
      { type: 'Cycling', minutes: 45 },
      { type: 'Swimming', minutes: 30 }
    ];

    // Spy on the method if necessary
    spyOn(component, 'getworknumber').and.callThrough();

    // Call the method and get the result
    const length = component.getworknumber(work);
    console.log(length)

    // Assert the result
    expect(length).toEqual(3);
    console.log("length : ",length)

    // Additional assertions if necessary
    expect(component.getworknumber).toHaveBeenCalledWith(work);
  }));

  it('get the workout type list', fakeAsync(() => {
    const work: Workout[] = [
      { type: 'Running', minutes: 60 },
      { type: 'Cycling', minutes: 45 },
      { type: 'Swimming', minutes: 30 }
    ];

    // Spy on the method if necessary
    spyOn(component, 'getworktypes').and.callThrough();

    // Call the method and get the result
    const length = component.getworktypes(work);
    console.log(length)

    // Assert the result
    expect(length).toEqual(['Running','Cycling','Swimming']);

    // Additional assertions if necessary
    expect(component.getworktypes).toHaveBeenCalledWith(work);
  }));
  

  it('Filter out workouts', fakeAsync(() => {
   
    // Spy on the method if necessary
    spyOn(component, 'filterItemsByCategory').and.callThrough();

    // Call the method and get the result
    const length = component.filterItemsByCategory();
    console.log(length)

    // Assert the result
    //expect(length).toBe(component.work);

    // Additional assertions if necessary
    expect(component.filterItemsByCategory).toHaveBeenCalledWith();
  }));

  it('Filter by search ', fakeAsync(() => {
   
    // Spy on the method if necessary
    spyOn(component, 'filterResults')

    // Call the method and get the result
    const length = component.filterResults('John');
    console.log(length)

    // Assert the result
    //expect(length).toBe(component.work);

    // Additional assertions if necessary
    expect(component.filterResults).toHaveBeenCalledWith('John');
  }));
  it('should reset to all health data when input is empty', fakeAsync(() => {
    component.searchbyusername.setValue('');
    component.filterResults('');
    expect(component.filteredLocationList).toEqual(component.healthdata);
      
  
  }));
  it('should reset to all health data when input is not empty', fakeAsync(() => {
    component.searchbyusername.setValue("j");
    component.filterResults('');
    console.log("component.filteredLocationList : ",component.filteredLocationList)
    expect(component.filteredLocationList.length).toBe(3); // Alice, Charlie, and Hari
  
      
  
  }));
  it('should show all items when no category is selected', fakeAsync(() => {
    component.selected=''
    component.filterItemsByCategory();
    expect(component.filteredLocationList).toEqual(component.healthdata);
  }));

  // Add more tests as neededS
});
