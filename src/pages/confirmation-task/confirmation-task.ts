import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ItineraryItem, Itinerary } from '../../models/Itinerary';
import { ItineraryServiceProvider } from '../../providers/itinerary-service/itinerary-service';
import { PersistenceServiceProvider } from '../../providers/persistence-service/persistence-service';

/**
 * Generated class for the ConfirmationTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 * THIS FILE IS JUST A DUMMY VERSION, CARLOS NEED REPLACE THIS.
 */

@IonicPage()
@Component({
  selector: 'page-confirmation-task',
  templateUrl: 'confirmation-task.html',
})
export class ConfirmationTaskPage {

  public itemSelected: ItineraryItem;
  public success:any;
  public optionSelected:any;
  public additionalDetails: String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private itineraryService: ItineraryServiceProvider,
    private store: PersistenceServiceProvider,
    private toast: ToastController) {
     this.itemSelected = this.navParams.get('item');
      console.log(this.itemSelected);
      

  }



  // This is how we currently can send updates to server
  sendItineraryItemUpdate() {
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


  public successChange(){
    // called when radio button is changed
    
  }

  public cancel(){
    this.navCtrl.pop();
  }

  /**
   * This method send the task change to API
   */
  public sendConfirmation(){
    console.log(this.success);
    console.log(this.optionSelected);
    console.log(this.additionalDetails);
    
    
  }


}
