import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Itinerary, ItineraryItem, ItineraryStatus } from '../../models/Itinerary';
import { ItineraryServiceProvider } from '../../providers/itinerary-service/itinerary-service';

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
  public occurrenceType: any;
  public itinerary = new Itinerary();
  public itemSelected: ItineraryItem;
  public isToggled: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private itineraryService: ItineraryServiceProvider) {

    this.itemSelected = navParams.get('itemSelected');
    this.itinerary = this.itemSelected.itinerary;
    this.isToggled = this.itinerary.isActive;
    this.occurrenceType = 'Em andamento';
  }

  sendChange() {
    this.itineraryService.updateItineraryItem(this.itemSelected)
      .subscribe((ok) => {
        this.toast.create({
          message: "Task edited successfully",
          duration: 3000,
          position: 'middle'
        }).present();
      }, (err) => {
        this.toast.create({
          message: "Task edition failed! :(",
          duration: 3000,
          position: 'middle'
        }).present();
      })
  }

  toggleChange() {
    this.isToggled = !this.isToggled;
    this.itinerary.status = this.isToggled ? ItineraryStatus.Active : ItineraryStatus.Inactive;
    this.toast.create({
      message: this.isToggled ? 'Itinerário ATIVO' : 'Itinerário INATIVO',
      duration: 1000,
      position: 'middle'
    }).present();
  }

  seletedStatus() {
    if (this.occurrenceType == 'Em andamento')
      this.itemSelected.done = false;

    if (this.occurrenceType == 'Concluído')
      this.itemSelected.done = true;

    if (this.occurrenceType == 'Pausado')
      this.itemSelected.done = false;

  }

}
