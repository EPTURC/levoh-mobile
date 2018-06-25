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

  public sendItineraryItem(itineraryId, itineraryItem: ItineraryItem){
    let url = this.URL_SERVER+itineraryId+'/itinerary_items/'+itineraryItem.id;
    console.log("PATCH: "+url);
    
    let body = {
      done: itineraryItem.done
  }
  console.log("Body: "+body);
  
   return this.http.patch(url, body);
  }

}
