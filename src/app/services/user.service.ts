import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
  constructor(private httpClient: HttpClient) { }

}

export class UserService {
  private userId:number = 0;
  private username:string = "";
  private displayName:string = "";
  private jwt:string = "";
  constructor() { }

  addLike(postId:number):boolean {
    return true;
  }

  getUsername():string {
    return this.username;
  }

  getUserId():number {
    return this.userId;
  }

  getDisplayName():string {
    return this.displayName;
  }
}
