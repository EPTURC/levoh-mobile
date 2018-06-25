import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the RequestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface Entity {
  id: any;
  encodeJson(): any;
  decodeJson(any);
}

export class RestfulProvider<T extends Entity> {
  
  private static API_BASE_URL = 'https://epturc-levo.herokuapp.com/api/v1/';
  
  protected baseUrl: string;
  
  constructor(public httpClient: HttpClient, private entityType: new () => T, path:String) {
    if (path.startsWith('/'))
      path = path.substr(1);
    this.baseUrl = RestfulProvider.API_BASE_URL + path;
    if (!this.baseUrl.endsWith('/'))
      this.baseUrl += '/';
  }

  /**
   * Retrieve an entity by its ID
   * @param id The ID of the entity
   * @returns An observable response with the requested entity
   */
  public getById(id, entity: T): Observable<T>{
    return this.httpClient.get(this.baseUrl+id).map((data)=> {
      return this.decodeJson(entity, data);
    })
  }

  /**
   * Request the insertion of an entity
   * @param entity The entity to be inserted
   */
  public insert(entity: T): Observable<any>{
    return this.httpClient.post(this.baseUrl, this.encodeJson(entity))
  }

  /**
   * Request the changes made on an entity to be persisted
   * @param entity The updated version of the entity
   */
  public update(entity: T): Observable<T>{
    return this.httpClient.put(this.baseUrl + entity.id, this.encodeJson(entity))
      .map((data)=> {
        return this.decodeJson(entity, data);
      });
  }

  /**
   * Retrieve the remotion of an entity
   * @param entity The entity to be removed
   */
  public remove(entity: T): Observable<any>{
    return this.httpClient.delete(this.baseUrl + entity.id);
  }

  /**
   * Retrieve all collection 
   */
  public getAll():Observable<T[]>{
    return this.httpClient.get<any[]>(this.baseUrl).map(this.decodeCollection);
  }

  protected decodeCollection(collection:any[]): T[] {
    return collection.map((data)=>{
      return this.decodeJson(data, new this.entityType());
    });
  }

  protected decodeJson(entity: T, data: any): T {
    entity.decodeJson(data);
    return entity;
  }

  protected encodeJson(entity: T): any {
    return entity.encodeJson();
  }

}
