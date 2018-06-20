import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itinerary } from '../../models/Itinerary';
import { RequestServiceProvider } from '../request-service/request-service';

/*
  Generated class for the ItineraryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItineraryServiceProvider extends RequestServiceProvider<Itinerary>{

  constructor(public http: HttpClient) {
   super(http, 'itineraries/driver/');
 
   
  }







}
