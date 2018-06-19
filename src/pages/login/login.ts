import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { VehicleServiceProvider } from '../../providers/vehicle-service/vehicle-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,vehicleService: VehicleServiceProvider) {

      vehicleService.getAll().subscribe(
        (resp)=>{
          console.log(resp);
          
        }
      );
  }

  indetification(){
    this.navCtrl.push(TabsPage);
  }

}
