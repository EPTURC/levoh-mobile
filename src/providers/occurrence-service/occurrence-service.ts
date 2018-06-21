import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Occurrence } from '../../models/Occurrence';
import { RequestServiceProvider } from '../request-service/request-service';

/*
  Generated class for the OccurrenceServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OccurrenceServiceProvider extends RequestServiceProvider<Occurrence>{

  constructor(public http: HttpClient) {
   super(http, 'occurrences');
  }


  public sendNewOccurrence(newOccurrence: Occurrence){
   return this.http.post(this.URL_SERVER, newOccurrence);
  }

}
