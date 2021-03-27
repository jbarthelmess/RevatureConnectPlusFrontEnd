import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserData } from '../auth/user.model';
import { Auth } from '../auth/auth.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  base:string = "http://35.225.143.245:8080/";
  user:UserData = null;
  constructor(private httpClient: HttpClient) { }

  getUsername():string {
    return this.user.username;
  }

  getUserId():number {
    return Number.parseInt(this.user.userId);
  }

  // since we may not get the displayname field it is default as undefined
  getDisplayName():any {
    return this.user.displayName;
  }

  getUserToken():any {
    const jwt = this.user;
    if(jwt === null) {
      return "";
    }
    return jwt.getToken();
  }

  setUser(user) {
    if(user === null) {
      this.user = null;
    } else {
      this.user = new UserData(user.userId, user.username, user.displayName, user.password);
    }
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

  login(credentials:Auth) {
    return this.httpClient.post<UserData>(this.base+"user/login", credentials).pipe(catchError((error:HttpErrorResponse, credentials)=>{
      if(error.error instanceof ErrorEvent) {
        console.log("Something happened on the client side:", error.error.message);
      } else {
        console.log(error.status + " with error body: ", error.error);
      }
      return of({});
    }));
  }

  registerUser(credentials) {
    return this.httpClient.post(this.base+"user/registration", credentials).pipe(catchError((error:HttpErrorResponse, credentials)=>{
      if(error.error instanceof ErrorEvent) {
        console.log("Something happened on the client side:", error.error.message);
      } else {
        console.log(error.status + " with error body: ", error.error);
      }
      return of({});
    }));
  }
}
