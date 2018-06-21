import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task';
import { RequestServiceProvider } from '../request-service/request-service';


/*
  Generated class for the TaskServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskServiceProvider extends RequestServiceProvider<Task>{

  constructor(public http: HttpClient) {
    super(http, 'tasks');
  }

}
