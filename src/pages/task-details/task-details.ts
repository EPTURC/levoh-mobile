import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Itinerary } from '../../models/Itinerary';
import { ItineraryItem } from '../../models/ItineraryItem';
import { ItineraryServiceProvider } from '../../providers/itinerary-service/itinerary-service';
import { ItineraryItemServiceProvider } from '../../providers/itinerary-item-service/itinerary-item-service';

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
  ,private itineraryItemService: ItineraryItemServiceProvider ) {

    this.itinerary = navParams.get('itineraryParam');
    this.itemSelected = navParams.get('itemSelected');
    this.occurrenceType = 'Em andamento';
    console.log('veichle '+this.itinerary);
    
    
  }

  sendChange(){
    
    let indexItem = this.findItemIndex(this.itemSelected);
    this.itinerary.items[indexItem] = this.itemSelected;
    console.log(this.itinerary);


    this.itineraryItemService.sendItineraryItem(this.itinerary.id
      , this.itemSelected).subscribe(
        (resp)=>{

          this.navCtrl.pop();
          this.presentToast('Status de atividade modificado!');
        }
      );
    

  }



  seletedStatus(){
    if(this.occurrenceType == 'Em andamento')
      this.itemSelected.done = false;

    if(this.occurrenceType == 'Concluído')
      this.itemSelected.done = true;

   if(this.occurrenceType == 'Pausado')
      this.itemSelected.done = false;

    
      
    
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
