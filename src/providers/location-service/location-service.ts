
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { Vehicle } from '../../models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Localization } from '../../models/Localization';
import { PersistenceServiceProvider } from '../persistence-service/persistence-service';
import { Itinerary } from '../../models/Itinerary';
/*
  Generated class for the LocationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationServiceProvider {
  private URL_SERVER = 'https://epturc-levo.herokuapp.com/api/v1/vehicles/';
  vehicle:Vehicle;
  location = new Localization();
  randomId:any;

  private itinerarySession: Itinerary;


  constructor(private geolocation: Geolocation
    , public toastCtrl: ToastController
    ,private http:HttpClient
    ,private persistenceService: PersistenceServiceProvider) {
    
  }

  /**
   * this method send the current location
   */
  sendDeviceLocation(){
  //;// console.log(this.location.);
   
    
   // console.log('location called');
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        
        
            // location received
            this.location.latitude = resp.coords.latitude+'';
            this.location.longitude = resp.coords.longitude+'';
            
            
            
     
            //get vehicle in Session
           this.persistenceService.getItinerarySession().subscribe(
            (resp)=>{
              this.itinerarySession = resp;
              this.vehicle = this.itinerarySession.vehicle;
              console.log('vehicle ID: '+this.vehicle.id);
              
                //sending location
                this.sendLocationByVehicleId(this.vehicle.id,this.location)
                .subscribe(
                  (resp)=>{
                      console.log(resp);
                    
                      this.presentToast('Localização enviada para a central');
                  },(err)=>{
                    console.log(err);
                    this.presentToast('problema no envio da localização');
                  }
                );

            }
          );
                
              
               



             
         
     
     }//(resp) => {
    ).catch((error) => {
      this.presentToast('Problema ao obter a localização');
     });

  }//sendDeviceLocation()
  


  /**
   * 
   * @param vehicleId 
   * @param location 
   */
  sendLocationByVehicleId(vehicleId, location:Localization){
    console.log('POST com URL:');
    console.log(vehicleId);
    
    console.log(this.URL_SERVER+''+String(vehicleId)+'/locations',location);
    
    return this.http.post(this.URL_SERVER+''+String(vehicleId)+'/locations',location);
  }



  /**
   * 
   * @param msg 
   */
  public presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
  
    toast.present();
  }

  /**
   * 
   * @param min 
   * @param max 
   */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


}
