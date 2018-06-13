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
      setInterval(() => {        
        locationServiceProvider.sendDeviceLocation();
      },60000);


      

      

       
      
        
        //mook
        this.taskList = [
        {tittle: 'titulo 1', timeDuration: 4, description: 'descricao1',type: 'Entrega',status: 'Ativo'},
        {tittle: 'titulo 2', timeDuration: 4, description: 'descricao2',type: 'Entrega',status: 'Ativo'},
        {tittle: 'titulo 3', timeDuration: 4, description: 'descricao3',type: 'Entrega',status: 'Ativo'},
        {tittle: 'titulo 4', timeDuration: 4, description: 'descricao4',type: 'Entrega',status: 'Ativo'},
        {tittle: 'titulo 5', timeDuration: 4, description: 'descricao5',type: 'Entrega',status: 'Ativo'},
        {tittle: 'titulo 6', timeDuration: 4, description: 'descricao6',type: 'Entrega',status: 'Ativo'},
        {tittle: 'titulo 7', timeDuration: 4, description: 'descricao7',type: 'Entrega',status: 'Ativo'},
        {tittle: 'titulo 8', timeDuration: 4, description: 'descricao8',type: 'Entrega',status: 'Ativo'}
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
