import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Occurrence } from '../../models/Occurrence';
import { RestfulProvider } from '../restful-provider/restful-provider';

/*
  Generated class for the OccurrenceServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OccurrenceServiceProvider extends RestfulProvider<Occurrence>{

  constructor(public httpClient: HttpClient) {
   super(httpClient, Occurrence, 'occurrences');
  }

}
