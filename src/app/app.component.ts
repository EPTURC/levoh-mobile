import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { Vehicle } from '../models/Vehicle';
import 'rxjs/add/operator/filter';
import { PersistenceServiceProvider } from '../providers/persistence-service/persistence-service';
import { VehicleServiceProvider } from '../providers/vehicle-service/vehicle-service';
import { GeoCoordinate } from '../models/GeoCoordinate';
import { Subscription } from 'rxjs/Subscription';
import { BatteryStatus } from '@ionic-native/battery-status';
import { MessagesServiceProvider } from '../providers/messages-service/messages-service';

@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  rootPage = TabsPage;
  vehicle: Vehicle = null;
  // 0 - 100 battery level
  private batteryLevel: number = -1;
  private battertStatusSubscription: Subscription = null;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private geolocation: Geolocation,
    private store: PersistenceServiceProvider,
    private vehicleProvider: VehicleServiceProvider,
    private batteryStatus: BatteryStatus,
    private toast: ToastController) {
    
    statusBar.backgroundColorByHexString('#000000');
    
    platform.ready().then(() => {
      splashScreen.hide()
    });
    this.subscribeVehicle();
    this.sendPosition();
    this.subscribeBatteryStatus();
  }

  sendPosition() {
    this.geolocation.watchPosition()
      .filter(pos => this.vehicle && this.batteryLevel >= 0 && pos.coords != undefined)
      .map(intoGeoCoordinate)
      .subscribe(loc => {
        this.vehicleProvider.insertLocationByVehicle(this.vehicle, loc)
        .subscribe(l => {
          console.log(`position sent: (${l.latitude}, ${l.longitude}), vehicle: ${this.vehicle.id}`)
          
        }, err => console.trace);
      });
  }

  getMessages(){

  }

  subscribeVehicle() {
    // TODO: Add subscribeVehice on PersistenceServiceProvider
    this.store.subscribeItinerary(it => {
      this.vehicle = it ? it.vehicle : null;
    })
  }

  subscribeBatteryStatus() {
    this.battertStatusSubscription = this.batteryStatus.onChange().subscribe(status => {
      this.batteryLevel = status.level;
      this.toast.create({
        message: `BatteryLevel = ${this.batteryLevel} ${status.isPlugged?'🔌':'🔋'}`,
        duration: 5000,
        position: 'middle'
      }).present();
    })
  }
}

function intoGeoCoordinate(pos: Geoposition): GeoCoordinate {
  let gc = new GeoCoordinate();
  gc.readGeoPosition(pos);
  return gc;
}