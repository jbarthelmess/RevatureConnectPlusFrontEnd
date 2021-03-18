import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpClient: HttpClient, private user:User ) { }
  addLike(postId:number):boolean {
    return true;
  }

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

}
