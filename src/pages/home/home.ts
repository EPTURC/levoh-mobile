import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Task } from '../../models/task';
import { TaskDetailsPage } from '../task-details/task-details';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { NewOccurrencePage } from '../new-occurrence/new-occurrence';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public taskList: Task[];

      constructor(public navCtrl: NavController
        , public toastCtrl: ToastController
        ,locationServiceProvider: LocationServiceProvider) {

         // Seta intervalo de execução do metodo getLocation
    /*  setInterval(() => {        
        locationServiceProvider.sendDeviceLocation();
      },60000);
*/

      

      

       
      
        
        //mook
        this.taskList = [
        
        ]


      }

      selectedTask(task: Task){
        
        this.navCtrl.push(TaskDetailsPage, {
          selectedTask: task
        });
      }

      newOccurrence(){
        this.navCtrl.push(NewOccurrencePage);
      }


  
     

}
