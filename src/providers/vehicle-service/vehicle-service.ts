import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../../models/Vehicle';
import { RestfulProvider } from '../restful-provider/restful-provider';
import { Observable } from 'rxjs/Observable';
import { GeoCoordinate } from '../../models/GeoCoordinate';

/*
  Generated class for the VehicleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehicleServiceProvider extends RestfulProvider<Vehicle> {
  constructor(public httpClient: HttpClient ) {
    super(httpClient, Vehicle, 'vehicles');
  }

  insertLocationByVehicle(vehicle: Vehicle, loc: GeoCoordinate): Observable<any> {
    return this.httpClient.post(this.baseUrl + vehicle.id + '/locations', loc);
  }
}
