import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private urlUpdate;

  constructor(public http: HttpClient) {
   super(http, 'itineraries/driver/');
   this.urlUpdate = this.ROOT_URL+'itineraries/'

   
  }

  public updateItinerary(itinerary: Itinerary){
    let url = this.urlUpdate+itinerary.id
    
   

    console.log(itinerary);
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(url,itinerary,{headers});
  }


  public findItineraryById(id){
    
    return this.http.get<Itinerary>(this.urlUpdate+id);
  }

 







}
