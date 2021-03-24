import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData){
    this.user = {
      username: authData.username,
      password: authData.password,
    };
    this.authSuccess();
  }

  login(authData: AuthData){
    this.user = {
      username: authData.username,
      password: authData.password
    };
    this.authSuccess();
  }

  logout() {
    this.authChange.next(false);
    this.user = null;
    this.router.navigate(['/login'])
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccess() {
    this.authChange.next(true);
    this.router.navigate(['/dashboard'])
  }

}
