import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itinerary, ItineraryItem } from '../../models/Itinerary';
import { Driver } from '../../models/Driver';
import { Observable } from 'rxjs/Observable';
import { RestfulProvider, intoEntity } from '../restful-provider/restful-provider';
import { Subject } from 'rxjs/Subject';


/*
  Generated class for the ItineraryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItineraryServiceProvider extends RestfulProvider<Itinerary>{

  private urlUpdate;

  constructor(public httpClient: HttpClient) {
    super(httpClient, Itinerary, 'itineraries');
  }

  public updateItineraryItem(item: ItineraryItem): Observable<ItineraryItem> {
    return this.httpClient.put(this.baseUrl + item.itinerary.id + 'itinerary_items/' + item.id, item.encodeJson())
      .map(intoEntity(item));
  }

  public getByDriver(driver: Driver): Observable<Itinerary> {
    return this.httpClient.get(this.baseUrl + 'driver/' + driver.id)
      .map(intoEntity(new Itinerary()));
  }
}
