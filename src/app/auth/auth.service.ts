import {Subject} from 'rxjs';
import {User} from './user.model';
import {AuthData} from './auth-data.model';

export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  registerUser(authData: AuthData){
    this.user = {
      username: authData.username,
      password: authData.password,
    };
    this.authChange.next(true);
  }

  login(authData: AuthData){
    this.user = {
      username: authData.username,
      password: authData.password
    };
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    return { ...this.user};
  }

  isAuth() {
    return this.user != null;
  }

}
