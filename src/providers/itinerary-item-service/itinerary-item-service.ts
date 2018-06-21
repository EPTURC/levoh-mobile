import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestServiceProvider } from '../request-service/request-service';
import { ItineraryItem } from '../../models/ItineraryItem';

/*
  Generated class for the ItineraryItemServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItineraryItemServiceProvider extends RequestServiceProvider<ItineraryItem>{

  

  
  constructor(public http: HttpClient) {
    super(http, 'itineraries/');
  }

  public sendItineraryItem(itineraryId, itineraryItem, id){
    let url = this.URL_SERVER+itineraryId+'/itinerary_items/'+id;
    
    
   return this.http.put(url, itineraryItem);
  }

}
