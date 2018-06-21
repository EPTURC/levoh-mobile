import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Task } from '../../models/task';
import { TaskDetailsPage } from '../task-details/task-details';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { NewOccurrencePage } from '../new-occurrence/new-occurrence';
import { ItineraryServiceProvider } from '../../providers/itinerary-service/itinerary-service';
import { Itinerary } from '../../models/Itinerary';
import { Driver } from '../../models/Driver';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service';
import { ItineraryItem } from '../../models/ItineraryItem';
import { PersistenceServiceProvider } from '../../providers/persistence-service/persistence-service';



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

      constructor(public navCtrl: NavController
        , public toastCtrl: ToastController
        ,locationServiceProvider: LocationServiceProvider
      , driverService: DriverServiceProvider
    , itineraryService: ItineraryServiceProvider
  , persistenceService: PersistenceServiceProvider) {

      



  driverService.getAll().subscribe(
        (resp)=>{
          //SORTEANDO UM USUÁRIO
            this.driverList = resp;
            let randomIndex = this.getRandomInt(0, this.driverList.length);
            this.selectedDriver = this.driverList[randomIndex];
            console.log('idDriver: '+this.selectedDriver.id);
            persistenceService.setDriverSession(this.selectedDriver).subscribe(
              (resp)=>{
                console.log(resp);
                
              }
            );
            this.selectedDriver.id = 21;
          //Buscando as tarefas do usuári sorteado
          itineraryService.getById(this.selectedDriver.id).subscribe(
            (resp)=>{

                 // Seta intervalo de execução do metodo getLocation
                setInterval(() => {        
                  locationServiceProvider.sendDeviceLocation();
                },20000);

              this.itineraty = resp;
              console.log(this.itineraty);
              
              
              
            },(error)=>{
              this.itineraty = null;
              
            }
          );



            

        }
      );//userService.getAll()
      

      }

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
  
     

}
