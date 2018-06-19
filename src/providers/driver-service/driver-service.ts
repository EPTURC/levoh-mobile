import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../../models/Driver';
import { RequestServiceProvider } from '../request-service/request-service';

/*
  Generated class for the DriverServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DriverServiceProvider extends RequestServiceProvider<Driver>{

  constructor(public http: HttpClient) {
    super(http, 'drivers');
  }

}
