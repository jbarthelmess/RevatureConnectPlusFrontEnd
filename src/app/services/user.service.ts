import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({providedIn: 'root'})
export class UserService {
  base:string = "localhost:8080/";
  constructor(private httpClient: HttpClient, private user:User ) { }

  getUsername():string {
    return this.user.userName;
  }

  getUserId():number {
    return this.user.userId;
  }

  // since we may not get the displayname field it is default as undefined
  getDisplayName():any {
    return this.user.displayName;
  }

  getUserToken():any {
    return this.user.jwt;
  }

  setUser(user:User) {
    this.user = user;
  }

  updateUser(password:string, displayName:string) {
    const requestBody = {
      password,
      displayName
    }
    const updatedUserJWT = this.httpClient.put(this.base+`/user`, requestBody);
    // update JWT info
  }

  deleteUser() {
    const deletedUser = this.httpClient.delete(this.base+`/user`);
    // kick out to the registration page, clear JWT cache
  }
}
