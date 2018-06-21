import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RequestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RequestServiceProvider<T> {
  
  ROOT_URL = 'https://epturc-levo.herokuapp.com/api/v1/';
  URL_SERVER = 'https://epturc-levo.herokuapp.com/api/v1/';
  

  
  constructor(public http: HttpClient, baseUrl:String) {
    this.URL_SERVER = this.URL_SERVER + baseUrl;
  }

  /**
   * 
   * @param url - parte da url que completa a a url do host
   * @returns - Retorna um Observable que deve ser tratado
   */
  public getById(id): Observable<T>{
    console.log(this.URL_SERVER+id);
    
    return this.http.get<T>(this.URL_SERVER+id);
  }

  /**
   * 
   */
  public insert(){
    
  }

  /**
   * 
   * @param entity 
   */
  public update(entity: T): Observable<T>{
    return null;
  }

  /**
   * 
   * @param entity 
   */
  public remove(entity: T): Observable<T>{
    return null;
  }

  /**
   * 
   * @param url 
   */
  public getAll():Observable<T[]>{
    return this.http.get<T[]>(this.URL_SERVER);
  }



}
