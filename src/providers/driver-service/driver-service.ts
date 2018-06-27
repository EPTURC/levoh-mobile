import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../../models/Driver';
import { RestfulProvider } from '../restful-provider/restful-provider';

/*
  Generated class for the DriverServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DriverServiceProvider extends RestfulProvider<Driver> {

  constructor(public httpClient: HttpClient) {
    super(httpClient, Driver, 'drivers');
  }
  
}
