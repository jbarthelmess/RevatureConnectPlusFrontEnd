import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthData} from './auth-data.model';
import { Router } from '@angular/router';
import { Auth } from './auth.model';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private authUser: Auth;

  constructor(private router: Router, private userService:UserService, private postService:PostService) {}

  registerUser(authData: AuthData){
    this.authUser = {
      username: authData.username,
      password: authData.password,
    };
    this.userService.registerUser(this.authUser).subscribe((data) =>{
      if(Object.keys(data).length === 0) {
        console.log("Registration Attempt failed, please try again with a different username");
        this.authUser = null;
      } else {
        console.log(data);
        this.authSuccess(data);
      }
    });
  }

  login(authData: AuthData){
    this.authUser = {
      username: authData.username,
      password: authData.password
    };
    this.userService.login(this.authUser).subscribe((data) =>{
      if(Object.keys(data).length === 0) {
        console.log("login attempt failed, please try again");
        this.authUser = null;
      } else {
        console.log(data);
        this.authSuccess(data);
      }
      //console.log(data);
    });
  }

  logout() {
    this.postService.showPosts = [];
    this.authChange.next(false);
    this.authUser = null;
    this.userService.setUser(null);
    this.router.navigate(['/login'])
  }

  getUser() {
    return { ...this.authUser };
  }

  isAuth() {
    return this.authUser != null;
  }
  private authSuccess(data) {
    this.userService.setUser(data);
    this.authChange.next(true);
    this.router.navigate(['/dashboard'])
  }
}
