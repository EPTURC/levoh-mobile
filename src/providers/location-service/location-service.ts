
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the LocationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationServiceProvider {

  constructor(private geolocation: Geolocation, public toastCtrl: ToastController) {
    console.log('Hello LocationServiceProvider Provider');
  }

  getLocation(){
   // console.log('location called');
    this.geolocation.getCurrentPosition().then((resp) => {
       console.log(resp.coords.latitude);
       console.log(resp.coords.longitude);
       this.presentToast();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
  public presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Localização enviada para a central',
      duration: 3000,
      position: 'middle'
    });
  
    toast.present();
  }

  


}
