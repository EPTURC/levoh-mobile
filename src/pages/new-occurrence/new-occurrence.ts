import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { OccurrenceServiceProvider } from '../../providers/occurrence-service/occurrence-service';
import { Occurrence } from '../../models/Occurrence';
import { Geolocation } from '@ionic-native/geolocation';
import { Localization } from '../../models/Localization';
import { Driver } from '../../models/Driver';
import { PersistenceServiceProvider } from '../../providers/persistence-service/persistence-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Session } from '../../models/Session';

/**
 * Generated class for the NewOccurrencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-occurrence',
  templateUrl: 'new-occurrence.html',
})
export class NewOccurrencePage {

  public description: String;
  public occurrenceType:String;
  private occurrence = new Occurrence()
  private location = new Localization();
  private driverSession:Driver;


  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private occurrenceService: OccurrenceServiceProvider
  , public toastCtrl: ToastController
, private geolocation: Geolocation
,private persistenceService: PersistenceServiceProvider
) {
  this.driverSession = Session.getDriver();
   

   
    
   
   
  }

  public sendNewOccurrence(){
    console.log(this.description);
    console.log(this.occurrenceType);
    
    

    this.geolocation.getCurrentPosition().then(
      (resp) => {
        
            // location received
            this.location.latitude = resp.coords.latitude+'';
            this.location.longitude = resp.coords.longitude+'';
            this.occurrence.driver_id = this.driverSession.id;
            this.occurrence.location = this.location.latitude +', '+this.location.longitude;
            this.occurrence.description = this.description;
            this.occurrence.type = this.occurrenceType;
            console.log(this.occurrence);
            
           this.occurrenceService.sendNewOccurrence(this.occurrence).subscribe(
              (resp)=>{


                this.presentToast('Ocorrência enviada para a central');
                this.navCtrl.pop();
                
              },
              (erro)=>{
                this.presentToast('Problema no envio da ocorrência');
              }
            );
            
     
     }//(resp) => {
    ).catch((error) => {
      
     console.log('erro na geolocalização');
     
     });

   


    this.occurrenceService.sendNewOccurrence(this.occurrence);
     }

 


       /**
   * 
   * @param msg 
   */
  public presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
  
    toast.present();
  }

 


}
