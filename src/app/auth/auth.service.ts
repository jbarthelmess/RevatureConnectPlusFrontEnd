import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError, Subject} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {AuthData} from './auth-data.model';
import { User } from './user.model';


interface AuthResponseData {
  userId: string,
  username: string,
  password: string,
  displayName?:string
}


@Injectable({providedIn: 'root'})
export class AuthService {
  currentUser = new Subject<User>();
  private userBaseURL: string;
  private authUser: User;

  constructor(private router: Router, private http: HttpClient) {
    this.userBaseURL = 'http://35.225.143.245:8080/user'
  }

  registerUser(authData: AuthData){
    return this.http
      .post<AuthResponseData>(
        `${this.userBaseURL}/registration`,
        authData
      )
      .pipe(
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthentication(
            respData.userId,
            respData.username,
            respData.password,
            respData.displayName
          )
        })
      );
  }

  login(authData: AuthData){
    return this.http
      .post<AuthResponseData>(
        `${this.userBaseURL}/login`,
        authData
      )
      .pipe(
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthentication(
            respData.userId,
            respData.username,
            respData.password,
            respData.displayName
          )
        })
      );
  }

  logout() {
    this.authUser = null;
    this.currentUser.next(this.authUser);
    this.router.navigate(['/login']);
  }

  isAuth() {
    if(this.authUser != null){
      return this.authUser;
    }
    return null;
  }

  private handleAuthentication(
    userId: string,
    username: string,
    password: string,
    displayName?: string
  ) {
    this.authUser = new User(userId, username, password, displayName);
    this.currentUser.next(this.authUser);
    this.router.navigate(['/dashboard']);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'USERNAME_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'USERNAME_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

}
