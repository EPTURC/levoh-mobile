import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { OccurrenceServiceProvider } from '../../providers/occurrence-service/occurrence-service';
import { Occurrence } from '../../models/Occurrence';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { GeoCoordinate } from '../../models/GeoCoordinate';
import { Driver } from '../../models/Driver';
import { PersistenceServiceProvider } from '../../providers/persistence-service/persistence-service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the NewOccurrencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-occurrence',
  templateUrl: 'new-occurrence.html',
})
export class NewOccurrencePage {

  public occurrence = new Occurrence();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private occurrenceService: OccurrenceServiceProvider,
              public toastCtrl: ToastController,
              private geolocation: Geolocation,
              private persistenceService: PersistenceServiceProvider) { }

  public fillMissingFieldsAndSendOccurrence() {
    // Wait for location and driver to be set then send the occurrence
    forkJoin(
      Observable.fromPromise(this.geolocation.getCurrentPosition()).map(this.fillLocation),
      this.persistenceService.getDriver(this.occurrence.driver))
    .map(this.sendOccurence)
    .subscribe(this.showSuccessToasAndNavigateBack, this.showFailToast);
  }

  private fillLocation(geoposition: Geoposition) {
    this.occurrence.location.readGeoPosition(geoposition);
  }

  private sendOccurence(): Observable<any> {
    return this.occurrenceService.insert(this.occurrence);
  }

  private showSuccessToasAndNavigateBack() {
    this.toastCtrl.create({
      message: 'Ocorrência enviada para a central',
      duration: 3000,
      position: 'middle'
    }).present();
    this.navCtrl.pop();
  }

  private showFailToast() {
    this.toastCtrl.create({
      message: 'Problema no envio da ocorrência',
      duration: 3000,
      position: 'middle'
    }).present();
  }
}
