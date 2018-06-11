import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RequestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RequestServiceProvider {
  
   URL_SERVER: String = 'https://epturc-levo.herokuapp.com/api/v1/';
  constructor(public http: HttpClient) {
    
   // headers.append('Access-Control-Allow-Origin' , '*');
   // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  // let headers = new Headers({ 'Content-Type': 'application/json' });
  // let options = new RequestOptions({ headers: headers });
  }

  getRequest(url){
    let retorno;
    
   
    
    this.http.get(this.URL_SERVER+url).subscribe(
      (res)=> {
        console.log(res);
        
        retorno = res;
      }
    );
    return retorno;
  }

  postRequest(url){
    this.http.post
  }

}
