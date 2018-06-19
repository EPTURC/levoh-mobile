import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectsSessionProvider } from '../objects-session/objects-session';
import { User } from '../../models/User';
import { RequestServiceProvider } from '../request-service/request-service';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider extends RequestServiceProvider<User>{

  userList: User[];
  

  constructor(public http: HttpClient
    , public session: ObjectsSessionProvider) {
    super(http, 'users');

  }



  
  /**
   * 
   * @param name 
   */
  public getUserByName(name: String): User{

    return null
  }


  /**
   * 
   * @param id 
   */
  public getUserById(id: Number): User{

    return null;
  }


  public getUserList(): User[]{

    this.http.get<User[]>(this.URL_SERVER).subscribe(
      (resp)=>{
          this.userList = resp;
      }
    );

    return null;
  }

}
