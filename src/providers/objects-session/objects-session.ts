import { Injectable } from '@angular/core';
import { Task } from '../../models/task';
import { User } from '../../models/User';
import { Driver } from '../../models/Driver';
import { Vehicle } from '../../models/vehicle';
import { Itinerary } from '../../models/Itinerary';

/*
  Generated class for the ObjectsSessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ObjectsSessionProvider {

  private static user: User;
  private static driver: Driver;
  private static task: Task;
  private static vehicle: Vehicle;
  private static itinerary: Itinerary;

  
  

  private constructor() {
    
  }


  

  /**
   *  getUserInstance
   */
  public static getUserInstance() : User{
    if(this.user == null){
      this.user = new User();
    }
    return this.user;
  }
  
  /**
   *  getVehicleInstance
   */
  public static getVehicleInstance() : Vehicle{
    if(this.vehicle == null){
      this.vehicle = new Vehicle();
    }
    return this.vehicle;
  }

  /**
   *  getDriverInstance
   */
  public static getDriverInstance() : Driver{
    if(this.driver == null){
      this.driver = new Driver();
    }
    return this.driver;
  }

  /**
   *  getItineraryInstance
   */
  public static getItineraryInstance() : Itinerary{
    if(this.itinerary == null){
      this.itinerary = new Itinerary();
    }
    return this.itinerary;
  }
  

  /**
   *  getTaskInstance
   */
  public static getTaskInstance() : Task{
    if(this.task == null){
      this.task = new Task();
    }
    return this.task;
  }

}
