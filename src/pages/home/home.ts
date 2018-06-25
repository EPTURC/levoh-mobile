import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { Task } from '../../models/task';
import { TaskDetailsPage } from '../task-details/task-details';
import { NewOccurrencePage } from '../new-occurrence/new-occurrence';
import { ItineraryServiceProvider } from '../../providers/itinerary-service/itinerary-service';
import { Itinerary } from '../../models/Itinerary';
import { Driver } from '../../models/Driver';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service';
import { ItineraryItem } from '../../models/ItineraryItem';

import { Session } from '../../models/Session';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocationServiceProvider } from '../../providers/location-service/location-service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public taskList: Task[];
  public driverList: Driver[];
  public selectedDriver: Driver;
  public itineraty: Itinerary;
  public itineratyItemList: ItineraryItem[];
  private session: Session;

      constructor(public navCtrl: NavController
        , public toastCtrl: ToastController
      ,private driverService: DriverServiceProvider
    ,private itineraryService: ItineraryServiceProvider
    ,locationServiceProvider: LocationServiceProvider
, private loadingCtrl: LoadingController
,private localNotifications: LocalNotifications
,private platform: Platform,) {

      
  let load = this.loadingCtrl.create({
    content: "Carregando..."
  });

  load.present();
  driverService.getAll().subscribe(
        (resp)=>{
          //SORTEANDO UM USUÁRIO
            this.driverList = resp;
            let randomIndex = this.getRandomInt(0, this.driverList.length);
            this.selectedDriver = this.driverList[randomIndex];
            console.log('idDriver: '+this.selectedDriver.id);

            Session.setDriver(this.selectedDriver);

           // persistenceService.setDriverSession(this.selectedDriver);
            
             this.selectedDriver.id = 21;
          //Buscando as tarefas do usuári sorteado
          itineraryService.getById(this.selectedDriver.id).subscribe(
            (resp)=>{

                 // Seta intervalo de execução do metodo getLocation
                setInterval(() => {        
                  locationServiceProvider.sendDeviceLocation();
                },5000);
            
              //resp.status = 'inativo';
              this.itineraty = resp;
              console.log(this.itineraty);
              Session.setItinerary(this.itineraty);
              
              load.dismiss();
              
            },(error)=>{
              load.dismiss();
              this.itineraty = null;
              
            }
          );



            

        }
      );//userService.getAll()
      
      
      }//construtor

     public taskIsDone(done:Boolean){
        if(done)
          return 'Concluído';
        else
          return 'Em andamento';
      }

      selectedItem(item: ItineraryItem){
        
        this.navCtrl.push(TaskDetailsPage, {
          itineraryParam: this.itineraty,
          itemSelected: item
        });
      }

      newOccurrence(){
        this.navCtrl.push(NewOccurrencePage);
      }



      /**
   * 
   * @param min 
   * @param max 
   */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  notificar(){
    this.platform.ready().then(() => {
      this.localNotifications.schedule({
        id: 1,
        title: 'notificação',
        text: 'Single ILocalNotification',
        icon: '../assets/imgs/icon.png'
        
      });
      

     
    });
  }


  activateItinerary(){
    console.log('Antes: ');
    console.log(this.itineraty);
    this.itineraty.status = 'ativo';
    console.log('Depois: ');
    console.log(this.itineraty);
    
    
    //this.itineraryService.updateItinerary(this.itineraty).subscribe();
  }


}
