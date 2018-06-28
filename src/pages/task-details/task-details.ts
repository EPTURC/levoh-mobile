import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Itinerary, ItineraryItem, ItineraryStatus } from '../../models/Itinerary';
import { ItineraryServiceProvider } from '../../providers/itinerary-service/itinerary-service';
import { PersistenceServiceProvider } from '../../providers/persistence-service/persistence-service';

/**
 * Generated class for the TaskDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {
  public itemSelected = new ItineraryItem(null);

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private itineraryService: ItineraryServiceProvider,
    private store: PersistenceServiceProvider) {

    this.itemSelected = navParams.get('itemSelected') || new ItineraryItem(new Itinerary());
  }

  sendChange() {
    console.log(this.itemSelected.done);
    this.itineraryService.updateItineraryItem(this.itemSelected)
      .subscribe(item => {
        item.itinerary.refreshItem(item);
        this.store.setItinerary(item.itinerary);
        this.toast.create({
          message: "Status de atividade modificado!",
          duration: 3000,
          position: 'middle'
        }).present();
        this.navCtrl.pop();
      }, err => {
        console.trace(err);
        this.toast.create({
          message: "Modificação não salva! :(",
          duration: 3000,
          position: 'middle'
        }).present();
      })
  }

}
