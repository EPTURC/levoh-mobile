import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../../models/vehicle';

/*
  Generated class for the VehicleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehicleServiceProvider {
   private URL_SERVER = 'https://epturc-levo.herokuapp.com/api/v1/vehicles/';
  constructor(public http: HttpClient) {
    
  }

  getVehiclesList(){
    return this.http.get<Vehicle[]>(this.URL_SERVER);
  }
  

}
