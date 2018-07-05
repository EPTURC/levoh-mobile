import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../../models/Driver';
import { Message } from '../../models/Message';
import { PersistenceServiceProvider } from '../persistence-service/persistence-service';

/*
  Generated class for the MessagesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesServiceProvider {
  static numberMsg: Number = 0;
  private url = 'https://epturc-levo.herokuapp.com/api/v1/messages/driver/';
  constructor(public http: HttpClient, private persistenceService: PersistenceServiceProvider) {
    
  }

  getMessagesByDriver(driver:Driver){
    
      console.log(this.url+driver.id);
      
     return this.http.get<Message>(this.url+driver.id);
  }

  verifyNewMessage(){
    this.persistenceService.subscribeDriver(
      (driver) => {

        this.http.get<Message[]>(this.url+driver.id).subscribe(
          (resp)=> {
    
          }
        );
      }
    );

    
  }

}
