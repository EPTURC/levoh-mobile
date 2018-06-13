
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { VehicleServiceProvider } from '../vehicle-service/vehicle-service';
import { Vehicle } from '../../models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Localization } from '../../models/Localization';
/*
  Generated class for the LocationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationServiceProvider {
  private URL_SERVER = 'https://epturc-levo.herokuapp.com/api/v1/vehicles/';
  vehicles:Vehicle[];
  location = new Localization();
  randomId:any;


  constructor(private geolocation: Geolocation, public toastCtrl: ToastController
  ,private vehicleService: VehicleServiceProvider
  ,private http:HttpClient) {
    
  }

  /**
   * 
   */
  sendDeviceLocation(){
  //;// console.log(this.location.);
   
    
   // console.log('location called');
    this.geolocation.getCurrentPosition().then(
      (resp) => {
      
        
            // location received
            this.location.latitude = resp.coords.longitude;
            this.location.longitude = resp.coords.longitude;
            console.log('localização obtida: Lat: '
                        +this.location.latitude
                        +'Long: '+this.location.longitude);
            
            
     
            //get vehicles
            this.vehicleService.getVehiclesList().subscribe(
              (resp)=>{
                
                this.vehicles = resp;
                
                
                this.randomId = this.getRandomInt(0,this.vehicles.length)//pegando um ID de veiculo qualquer
                
                this.randomId = this.vehicles[this.randomId].id;
                console.log("Lista recebida");
                console.log(resp);
                console.log('id Selecionado: '+this.randomId);
                
                //sending location
                this.sendLocationByVehicleId(this.randomId,this.location)
                .subscribe(
                  (resp)=>{
                      console.log(resp);
                    
                      this.presentToast('Localização enviada para a central');
                  },(err)=>{
                    console.log(err);
                    this.presentToast('problema no envio da localização');
                  }
                );



              }//(resp)=>{
            );
         
     
     }//(resp) => {
    ).catch((error) => {
      console.log('Problema ao obter a localização');
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
