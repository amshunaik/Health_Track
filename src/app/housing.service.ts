import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  housingLocation: HousingLocation[] = [{
    id: 9999,
    name: 'Test Home',
    city: 'Test city',
    state: 'ST',
    photo: `${this.baseUrl}/example-house.jpg`,
    availableUnits: 99,
    
    wifi: true,
    laundry: false,
  }];
  getAllHousingLocations(): HousingLocation[] {
    return this.housingLocation;
  }
  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocation.find((h) => h.id === id);
  }

  constructor() { 
    
  }
}
