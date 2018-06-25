import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service';
import { Driver } from '../../models/Driver';
import { PersistenceServiceProvider } from '../../providers/persistence-service/persistence-service';
import { Observable } from 'rxjs/Observable';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private driverProvider: DriverServiceProvider,
    private store: PersistenceServiceProvider,
    private toast: ToastController) { }

  private driver = new Driver();

  authenticate() {
    // FIXME: Ugly 
    this.driverProvider.getById(21, this.driver)
      .subscribe(
        () => {
          this.persistDriver().subscribe(() => this.navigateToHome());
        },
        () => {
          this.showFailToast();
        })
  }

  persistDriver(): Observable<Driver> {
    return this.store.setDriver(this.driver)
  }

  navigateToHome() {
    this.navCtrl.popToRoot();
  }

  showFailToast() {
    this.toast.create({
      message: 'Login falhou',
      duration: 3000,
      position: 'middle'
    }).present();
  }

}
