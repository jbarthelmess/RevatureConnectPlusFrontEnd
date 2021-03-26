import {Injectable} from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http'
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap(revUser => {
        if(!revUser){
          return next.handle(req);
        }
        const modifiedReq = req.clone({headers: new HttpHeaders().set('Authorization', revUser.password)});
        return next.handle(req);
      })
    );
  }
}

