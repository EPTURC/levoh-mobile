import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestServiceProvider } from '../request-service/request-service';
import { Task } from '../../models/task';

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
