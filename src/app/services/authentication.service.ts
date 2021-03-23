import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements HttpInterceptor{

  constructor(private userService:UserService) { }

  intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    const authorizedRequest = req.clone({setHeaders:{Authorization:this.userService.getUserToken()}});
    return next.handle(authorizedRequest);
  }
}
