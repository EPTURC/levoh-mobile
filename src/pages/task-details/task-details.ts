import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';

import { Itinerary } from '../../models/Itinerary';
import { ItineraryItem } from '../../models/ItineraryItem';
import { ItineraryServiceProvider } from '../../providers/itinerary-service/itinerary-service';
import { ItineraryItemServiceProvider } from '../../providers/itinerary-item-service/itinerary-item-service';
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
  public occurrenceType:any;
  public itinerary = new Itinerary();
  public itemSelected: ItineraryItem;
 

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private toast: ToastController
  ,private itineraryService: ItineraryServiceProvider
  ,private itineraryItemService: ItineraryItemServiceProvider
  ,public modalCtrl: ModalController ) {

    this.itinerary = navParams.get('itineraryParam');
    this.itemSelected = navParams.get('itemSelected');
    this.occurrenceType = 'Em andamento';
    console.log('veichle '+this.itinerary);
    
    
  }

  sendChange(){
    

      this.navCtrl.push(ConfirmationTaskPage, { 
        item: this.itemSelected,
        itinerary: this.itinerary 
      });
      
      

  }

 


  findItemIndex(item: ItineraryItem){
  
    for(var i =0; i<this.itinerary.items.length ;i++){
        if(this.itinerary.items[i] == item)
          return i;
          
    }
  
  }

     /**
   * 
   * @param msg 
   */
  public presentToast(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
  
    toast.present();
  }

}
