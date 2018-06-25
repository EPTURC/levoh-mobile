import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { VehicleServiceProvider } from '../providers/vehicle-service/vehicle-service';
import { Vehicle } from '../models/Vehicle';


@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  rootPage = TabsPage;
  vehicle = new Vehicle();

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private geolocation: Geolocation,
    private toast: ToastController,
    private vehicleProvider: VehicleServiceProvider) {
    
    statusBar.backgroundColorByHexString('#000000');
    
    platform.ready().then(() => {
      splashScreen.hide()
    });
    this.sendPosition();
  }

  sendPosition() {
    this.geolocation.getCurrentPosition()
    .then((evt) => {
      this.toast.create({
        message: `(${evt.coords.latitude}, ${evt.coords.longitude})`,
        duration: 3000,
        position: 'middle'}).present();

      // TODO: send 
      setTimeout(()=> {this.sendPosition()}, 20000);
    })
  }
}
