import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Driver } from '../../models/Driver';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise'
import { Itinerary } from '../../models/Itinerary';
/*
  Generated class for the PersistenceServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const KEY_DRIVER = 'driverSession5';
const KEY_ITINERARY = 'itinerarySession'

@Injectable()
export class PersistenceServiceProvider {

  constructor(public http: HttpClient,
    private storage: Storage) { }

  public getDriver(driver: Driver): Observable<Driver> {
    let promise = this.storage.get(KEY_DRIVER);
    return Observable.fromPromise(promise).map((json) => {
      driver.decodeJson(json);
      return driver;
    });
  }

  public setDriver(driver: Driver): Observable<any> {
    let promise = this.storage.set(KEY_DRIVER, driver.encodeJson());
    return Observable.fromPromise(promise);
  }

  public getItinerary(itinerary: Itinerary): Observable<Itinerary> {
    let promise = this.storage.get(KEY_ITINERARY);
    return Observable.fromPromise(promise).map((json) => {
      itinerary.decodeJson(json);
      return itinerary;
    });
  }

  public setItinerary(itinerary: Itinerary): Observable<any> {
    let promise = this.storage.set(KEY_ITINERARY, itinerary.encodeJson());
    return Observable.fromPromise(promise);
  }

}
