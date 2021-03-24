import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthData} from './auth-data.model';
import { Router } from '@angular/router';
import { Auth } from './auth.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private authUser: Auth;

  constructor(private router: Router) {}

  registerUser(authData: AuthData){
    this.authUser = {
      username: authData.username,
      password: authData.password,
    };
    this.authSuccess();
  }

  login(authData: AuthData){
    this.authUser = {
      username: authData.username,
      password: authData.password
    };
    this.authSuccess();
  }

  logout() {
    this.authChange.next(false);
    this.authUser = null;
    this.router.navigate(['/login'])
  }

  getUser() {
    return { ...this.authUser };
  }

  isAuth() {
    return this.authUser != null;
  }

  private authSuccess() {
    this.authChange.next(true);
    this.router.navigate(['/dashboard'])
  }

}
