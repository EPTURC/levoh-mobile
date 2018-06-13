import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RequestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RequestServiceProvider {
  
   URL_SERVER= 'https://epturc-levo.herokuapp.com/api/v1/';
  constructor(public http: HttpClient) {
    
   // headers.append('Access-Control-Allow-Origin' , '*');
   // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  // let headers = new Headers({ 'Content-Type': 'application/json' });
  // let options = new RequestOptions({ headers: headers });
  }

  /**
   * 
   * @param url - parte da url que completa a a url do host
   * @returns - Retorna um Observable que deve ser tratado
   */
  getRequest(url){
    return this.http.get(this.URL_SERVER+url);
  }

  postRequest(url, body){
   return this.http.post(this.URL_SERVER+url, body);
  }

}
