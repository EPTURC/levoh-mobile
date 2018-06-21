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
@Injectable()
export class PersistenceServiceProvider {

  private keySession = 'driverSession';
  private keyItinerarySession = 'itinerarySession'
  constructor(public http: HttpClient, private storage: Storage) {
    
  }

  public getDriverSession(): Observable<Driver>{
   let promise = this.storage.get(this.keySession);
   
    return Observable.fromPromise(promise);
  }

  public setDriverSession(driver: Driver){
    let promise = this.storage.set(this.keySession, driver);
    
   return Observable.fromPromise(promise);
  }

  public getItinerarySession(): Observable<Itinerary>{
    let promise = this.storage.get(this.keyItinerarySession);
    
     return Observable.fromPromise(promise);
   }
 
   public setItinerarySession(itinerary: Itinerary){
     let promise = this.storage.set(this.keyItinerarySession, itinerary);
     
    return Observable.fromPromise(promise);
   }

}
