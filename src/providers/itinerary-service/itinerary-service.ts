import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itinerary, ItineraryItem } from '../../models/Itinerary';
import { Driver } from '../../models/Driver';
import { Observable } from 'rxjs/Observable';
import { RestfulProvider } from '../restful-provider/restful-provider';


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

  public updateItineraryItem(item: ItineraryItem): Observable<any> {
    return this.httpClient.put(this.baseUrl + item.itinerary.id + 'itinerary_items/' + item.id, item.encodeJson())
    .map((data) => {
      item.decodeJson(data);
      return item;
    })
  }

  public getByDriver(driver: Driver, it: Itinerary): Observable<Itinerary> {
    it.driver = driver;
    return this.httpClient.get(this.baseUrl + 'driver/' + driver.id)
      .map((data) => {
        it.driver = driver;
        return this.decodeJson(it, data);
      });
  }
}
