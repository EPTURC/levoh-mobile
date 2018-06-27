import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import { NextObserver, ErrorObserver } from 'rxjs/Observer';

/*
  Generated class for the RequestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface Entity {
  id: number;
  encodeJson(): any;
  decodeJson(any);
}

export function intoEntity<T extends Entity>(entity: T): (any) => T {
  return (json) => {
    entity.decodeJson(json);
    return entity;
  };
}

export function intoEntityArray<T extends Entity>(type: new () => T): (any) => T[] {
  return (collection: any[]) => {
    return collection.map(intoEntity(new type()));
  }
}

export class RestfulProvider<T extends Entity> {

  private static API_BASE_URL = 'https://epturc-levo.herokuapp.com/api/v1/';
  private entityById: Map<number, T> = new Map();
  private subjectById: Map<number, Subject<T>> = new Map();
  private wholeSubject = new Subject<T[]>();

  protected baseUrl: string;

  constructor(public httpClient: HttpClient, private entityType: new () => T, path: String) {
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
  public getById(id: number): Observable<T> {
    let req = this.httpClient.get(this.baseUrl + id)
      .map(intoEntity(new this.entityType()));
    req.subscribe(this.onSuccessNotifySubscribers(id));
    req.subscribe(this.onErrorCleanSubscriptions(id));
    return this.getEntitySubjectById(id);
  }

  /**
   * Request the insertion of an entity
   * @param entity The entity to be inserted
   */
  public insert(entity: T): Observable<T> {
    let sub = new Subject<T>();
    let req = this.httpClient.post(this.baseUrl, entity.encodeJson())
      .map(intoEntity(entity));
    req.subscribe(this.onSuccessNotifySubscribers())
    req.subscribe(this.onSuccessRegisterSubject(sub));
    req.subscribe(this.onErrorEndSubscriptions(sub));
    return sub;
  }

  /**
   * Request the changes made on an entity to be persisted
   * @param entity The updated version of the entity
   */
  public update(entity: T): Observable<T> {
    let req = this.httpClient.put(this.baseUrl + entity.id, entity.encodeJson())
      .map(intoEntity(entity));

    req.subscribe(this.onSuccessNotifySubscribers(entity.id));
    req.subscribe(this.onErrorCleanSubscriptions(entity.id));

    return this.getEntitySubjectById(entity.id);
  }

  /**
   * Retrieve the remotion of an entity
   * @param entity The entity to be removed
   */
  public remove(entity: T): Observable<any> {
    let sub = this.getEntitySubjectById(entity.id);
    let req = this.httpClient.delete(this.baseUrl + entity.id);
    req.subscribe(this.onSuccCleanSubscriptions(entity.id));
    return
  }

  // Retrieve all collection
  public getAll(): Observable<T[]> {
    let req = this.httpClient.get<any[]>(this.baseUrl)
        .map(intoEntityArray(this.entityType));
    req.subscribe(this.onSuccessbroadcastChanges());
    return this.wholeSubject;
  }

  // Notify all subscribers of an ID in case of success;
  private onSuccessNotifySubscribers(id?: number): NextObserver<T> {
    return {
      next: (entity) => {
        id = id || entity.id;
        this.entityById.set(id, entity);
        this.wholeSubject.next(this.allEntriesArray)
        this.notifySubscribersOf(entity);
      }
    }
  }

  // Register the passed subject in case of success
  private onSuccessRegisterSubject(sub: Subject<T>): NextObserver<T> {
    return {
      next: (entity) => {
        this.subjectById.set(entity.id, sub);
        sub.next(entity);
      }
    }
  }

  // Remove subject of id in case of error
  private onErrorCleanSubscriptions(id: number): ErrorObserver<T> {
    return {
      error: () => {
        this.cleanSubscriptions(id);
      }
    }
  }

  // Remove subject of id in case of success
  private onSuccCleanSubscriptions(id: number): NextObserver<T> {
    return {
      next: () => {
        this.cleanSubscriptions(id);
      }
    }
  }

  // End transmissions to subscribers of the subject on error
  private onErrorEndSubscriptions(sub: Subject<T>): ErrorObserver<T> {
    return {
      error: () => {
        this.endSubscriptions(sub);
      }
    }
  }

  private onSuccessbroadcastChanges(): NextObserver<T[]> {
    return {
      next: (entities) => {
        entities.forEach((e) => {
          this.notifySubscribersOf(e);
        })
        this.wholeSubject.next(this.allEntriesArray);
      }
    }
  }

  private cleanSubscriptions(id: number) {
    let sub = this.getEntitySubjectById(id);
    this.endSubscriptions(sub);
    this.subjectById.delete(id);
    this.entityById.delete(id);
    this.wholeSubject.next(this.allEntriesArray);
  }

  private endSubscriptions(sub: Subject<T>) {
    sub.next(new this.entityType());
    sub.complete();
  }

  private notifySubscribersOf(entity: T) {
    let sub = this.subjectById.get(entity.id);
    if (sub) sub.next(entity);
  }

  /**
   * Provede a subject of an entity by its ID
   * @param id The identifier number of the entity
   */
  private getEntitySubjectById(id: number): Subject<T> {
    let sub = this.subjectById.get(id);
    if (sub) return sub;
    sub = new Subject<T>();
    this.subjectById.set(id, sub);
    return sub;
  }

  /**
   * Return an array with the last version of all entities
   */
  private get allEntriesArray(): T[] {
    let all = new Array<T>(this.entityById.size);
    let i = 0;
    this.entityById.forEach((v) => {
      all[i++] = v;
    });
    return all;
  }

}
