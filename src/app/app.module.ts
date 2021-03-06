import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { TaskDetailsPage } from '../pages/task-details/task-details';
import { LoginPage } from '../pages/login/login';
import { NewOccurrencePage } from '../pages/new-occurrence/new-occurrence';
import { FeedPage } from '../pages/feed/feed';
import { VehicleServiceProvider } from '../providers/vehicle-service/vehicle-service';
import { DriverServiceProvider } from '../providers/driver-service/driver-service';
import { TaskServiceProvider } from '../providers/task-service/task-service';
import { ItineraryServiceProvider } from '../providers/itinerary-service/itinerary-service';
import { IonicStorageModule } from '@ionic/storage';
import { PersistenceServiceProvider } from '../providers/persistence-service/persistence-service';
import { OccurrenceServiceProvider } from '../providers/occurrence-service/occurrence-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ConfirmationTaskPage } from '../pages/confirmation-task/confirmation-task';
import { BatteryStatus } from '@ionic-native/battery-status';
import { MessagesServiceProvider } from '../providers/messages-service/messages-service';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TaskDetailsPage,
    NewOccurrencePage,
    ConfirmationTaskPage,
    FeedPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot({
      name: "levo",
      storeName: 'session',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TaskDetailsPage,
    NewOccurrencePage,
    ConfirmationTaskPage,
    FeedPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    VehicleServiceProvider,
    DriverServiceProvider,
    TaskServiceProvider,
    ItineraryServiceProvider,
    PersistenceServiceProvider,
    OccurrenceServiceProvider,
    LocalNotifications,
    BatteryStatus,
    MessagesServiceProvider
  ]
})
export class AppModule {}
