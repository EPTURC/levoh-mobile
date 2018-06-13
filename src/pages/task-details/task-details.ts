import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Task } from '../../models/task';

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

  public task: Task;
  public isToggled: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private toast: ToastController ) {

    this.task = navParams.get('selectedTask');
    console.log(this.task.tittle);
    
  }

  toggleChange(){
    if(!this.isToggled){
      this.toast.create({
        message: 'Tarefa concluída',
        duration: 1000,
        position: 'middle'
      }).present();
    }else{
      this.toast.create({
        message: 'Tarefa não concluída',
        duration: 2000,
        position: 'middle'
      }).present();
    }
  }

  

}
