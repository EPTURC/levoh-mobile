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
  public isToggled: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private toast: ToastController
  ,private itineraryService: ItineraryServiceProvider
  ,private itineraryItemService: ItineraryItemServiceProvider ) {

    this.itinerary = navParams.get('itineraryParam');
    this.itemSelected = navParams.get('itemSelected');
    this.setToggle(this.itinerary.status);
    this.occurrenceType = 'Em andamento';
    console.log('veichle '+this.itinerary);
    
    
  }

  sendChange(){
    
    let indexItem = this.findItemIndex(this.itemSelected);
    this.itinerary.items[indexItem] = this.itemSelected;
    console.log(this.itinerary);


    this.itineraryService.updateItinerary(this.itinerary).subscribe();
    this.itinerary.items.forEach(element => {
      console.log(element);
      
   // this.itineraryItemService.sendItineraryItem(this.itinerary.id
 //     , element, this.itinerary.items[0].id).subscribe();
    });
    

  }

  toggleChange(){
    if(!this.isToggled){
      this.itinerary.status = 'ativo';
      this.toast.create({
        message: 'Itinerário ATIVO',
        duration: 1000,
        position: 'middle'
      }).present();
    }else{
      this.itinerary.status = 'inativo';
      this.toast.create({
        message: 'Itinerário INATIVO',
        duration: 2000,
        position: 'middle'
      }).present();
    }
  }

  setToggle(input: String){
  
    this.itinerary.status = input;
    if(input == 'ativo')
      this.isToggled = true
    else  
      this.isToggled = false
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

}
