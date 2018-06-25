import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Task } from '../../models/Task';
import { TaskDetailsPage } from '../task-details/task-details';
import { NewOccurrencePage } from '../new-occurrence/new-occurrence';
import { ItineraryServiceProvider } from '../../providers/itinerary-service/itinerary-service';
import { Itinerary, ItineraryItem } from '../../models/Itinerary';
import { Driver } from '../../models/Driver';
import { PersistenceServiceProvider } from '../../providers/persistence-service/persistence-service';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public itineraty = new Itinerary();
  public get itineratyItemList(): ItineraryItem[] {
    return this.itineraty.items;
  }

  public get taskList(): Task[] {
    return this.itineraty.items.map(item=>item.task);
  }

  constructor(public navCtrl: NavController,
    private itineraryService: ItineraryServiceProvider,
    private persistenceService: PersistenceServiceProvider,
    private navControl: NavController,
    private app: App) {
      this.retrieveItinerary()
  }

  retrieveItinerary() {
    let driver = new Driver();
    this.persistenceService.getDriver(driver)
    .subscribe(() => {
      if (!driver.id) {
        this.app.getRootNav().push(LoginPage);
        return;
      }
      this.itineraryService.getByDriver(driver, this.itineraty).subscribe(it => console.log);
    });
  }

  // After login is completed, The login page is poped out stack state.
  // How to retrieve itinerate at this point();

  navigateToItemDetailPage(item: ItineraryItem) {
    this.navCtrl.push(TaskDetailsPage, {
      itineraryParam: this.itineraty,
      itemSelected: item
    });
  }

  navigateToNewOccurrencePage(){
    this.navCtrl.push(NewOccurrencePage);
  }

}
