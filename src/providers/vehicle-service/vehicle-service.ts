import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { RequestServiceProvider } from '../request-service/request-service';

/*
  Generated class for the VehicleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehicleServiceProvider extends RequestServiceProvider<Vehicle>{
   
  constructor(public http: HttpClient ) {
    super(http,'vehicles');
  }

  

}
