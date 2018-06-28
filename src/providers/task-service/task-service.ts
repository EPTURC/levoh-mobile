import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/Task';
import { RestfulProvider } from '../restful-provider/restful-provider';


/*
  Generated class for the TaskServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskServiceProvider extends RestfulProvider<Task>{

  constructor(public httpClient: HttpClient) {
    super(httpClient, Task, 'tasks');
  }

}
