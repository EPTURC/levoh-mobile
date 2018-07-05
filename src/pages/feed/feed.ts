import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersistenceServiceProvider } from '../../providers/persistence-service/persistence-service';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../models/Message';
import { MessagesServiceProvider } from '../../providers/messages-service/messages-service';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  public centralMsg:Message;


  constructor(public navCtrl: NavController, public navParams: NavParams
    , private persistenceService: PersistenceServiceProvider
    ,private http: HttpClient
    ,private messagesService: MessagesServiceProvider) {

    
    
  }

  ionViewWillEnter() {
    this.persistenceService.subscribeDriver(driver => {
        
      console.log(driver);

      
      this.messagesService.getMessagesByDriver(driver).subscribe(
        (resp)=>{
         // this.centralMsg =  Array.isArray();
          this.centralMsg = resp;
          
        }
      );
      
      
    })
  }
  

}
