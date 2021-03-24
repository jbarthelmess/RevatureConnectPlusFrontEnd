import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpClient: HttpClient, private user:User ) { }
  addLike(postId:number):boolean {
    return true;
  }

  getUsername():string {
    return this.user.username;
  }

  getUserId():string {
    return this.user.userId;
  }

  // since we may not get the displayname field it is default as undefined
  getDisplayName():any {
    return this.user.displayName;
  }

}
