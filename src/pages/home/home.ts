import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Task } from '../../models/Task';
import { TaskDetailsPage } from '../task-details/task-details';
import { NewOccurrencePage } from '../new-occurrence/new-occurrence';
import { ItineraryServiceProvider } from '../../providers/itinerary-service/itinerary-service';
import { ItineraryItem } from '../../models/Itinerary';
import { PersistenceServiceProvider } from '../../providers/persistence-service/persistence-service';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public itineratyItemList: Array<ItineraryItem> = [];

  public get taskList(): Task[] {
    return this.itineratyItemList.map(item=>item.task);
  }

  constructor(public navCtrl: NavController,
    private itineraryService: ItineraryServiceProvider,
    private persistenceService: PersistenceServiceProvider,
    private app: App) {
      this.subscribeCurrentDriver();
      this.subscribeItinerary();
  }

  private subscribeItinerary() {
    this.persistenceService.subscribeItinerary(it => {
      this.itineratyItemList = it.items || [];
    })
  }

  private subscribeCurrentDriver() {
    this.persistenceService.subscribeDriver(driver => {
      if (!driver) {
        this.app.getRootNav().push(LoginPage);
        return;
      }
      this.refreshItineraryOfDriver(driver);
    })
  }

  private refreshItineraryOfDriver(driver) {
    let subscription = this.itineraryService.getByDriver(driver).subscribe(it => {
      console.log("refreshing itinerary");
      this.persistenceService.setItinerary(it);
      subscription.unsubscribe();
    });
  }

  // After login is completed, The login page is poped out stack state.
  // How to retrieve itinerate at this point();

  navigateToItemDetailPage(item: ItineraryItem) {
    this.navCtrl.push(TaskDetailsPage, {
      itemSelected: item
    });
  }

  navigateToNewOccurrencePage(){
    this.navCtrl.push(NewOccurrencePage);
  }

}
