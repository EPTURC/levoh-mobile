import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';

import { Itinerary, ItineraryItem, ItineraryStatus } from '../../models/Itinerary';
import { ConfirmationTaskPage } from '../confirmation-task/confirmation-task';

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
    private toast: ToastController) {

    this.itemSelected = navParams.get('itemSelected') || new ItineraryItem(new Itinerary());
  }

  sendChange(){
      this.navCtrl.push(ConfirmationTaskPage, { 
        item: this.itemSelected,
        itinerary: this.itemSelected.itinerary 
      });
  }

}
