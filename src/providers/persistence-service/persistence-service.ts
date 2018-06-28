import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Driver } from '../../models/Driver';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise'
import { Itinerary } from '../../models/Itinerary';
import { Subject } from 'rxjs/Subject';
import { PartialObserver } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
/*
  Generated class for the PersistenceServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const KEY_DRIVER = 'driverSession7';
const KEY_ITINERARY = 'itinerarySession'

@Injectable()
export class PersistenceServiceProvider {

  private currentDriver: Driver;
  private currentDriverSubject = new Subject<Driver>();

  private currentItinerary: Itinerary;
  private currentItinerarySubject = new Subject<Itinerary>();

  constructor(public http: HttpClient,
    private storage: Storage) { }

  public getDriver(driver: Driver): Observable<Driver> {
    let promise = this.storage.get(KEY_DRIVER);
    return Observable.fromPromise(promise).map((json) => {
      driver.decodeJson(json);
      return driver;
    });
  }

  subscribeDriver(next?: (value: Driver) => void, error?: (error: any) => void, complete?: () => void): Subscription;
  subscribeDriver(observer?: PartialObserver<Driver>): Subscription;
  subscribeDriver(observerOrNext?: any, error?: (error: any) => void, complete?: () => void): Subscription {
    if (this.currentDriver != null) {
      if (typeof observerOrNext == 'function') {
        observerOrNext(this.currentDriver);
      } else if (observerOrNext.next) {
        observerOrNext.next(this.currentDriver);
      }
    } else {
      this.storage.get(KEY_DRIVER).then((json)=> {
        let driver = null;
        if (json) {
          driver = new Driver();
          driver.decodeJson(json);
        }
        this._setDriver(driver);
      });
    }
    return this.currentDriverSubject.subscribe(observerOrNext, error, complete);
  }

  setDriver(driver: Driver) {
    this._setDriver(driver);
    this.storage.set(KEY_DRIVER, driver.encodeJson())
      .catch(() => {
        console.log("Can't persist driver");
      });
  }

  _setDriver(driver: Driver) {
    this.currentDriver = driver;
    this.currentDriverSubject.next(this.currentDriver);
  }

  subscribeItinerary(next?: (value: Itinerary) => void, error?: (error: any) => void, complete?: () => void): Subscription;
  subscribeItinerary(observer?: PartialObserver<Itinerary>): Subscription;
  subscribeItinerary(observerOrNext?: any, error?: (error: any) => void, complete?: () => void): Subscription {
    if (this.currentItinerary != null) {
      if (typeof observerOrNext == 'function') {
        observerOrNext(this.currentItinerary);
      } else if (observerOrNext.next) {
        observerOrNext.next(this.currentItinerary);
      }
    } else {
      this.storage.get(KEY_ITINERARY).then((json)=> {
        let itinerary = null;
        if (json) {
          itinerary = new Itinerary();
          itinerary.decodeJson(json);
        }
        this._setItinerary(itinerary);
      });
    }
    return this.currentItinerarySubject.subscribe(observerOrNext, error, complete);
  }

  public setItinerary(itinerary: Itinerary) {
    this._setItinerary(itinerary)
    this.storage.set(KEY_ITINERARY, itinerary.encodeJson())
      .catch(() => {
        console.log("Can't persist itinerary")
      });
  }

  _setItinerary(itinerary: Itinerary) {
    this.currentItinerary = itinerary;
    this.currentItinerarySubject.next(this.currentItinerary);
  }

}
