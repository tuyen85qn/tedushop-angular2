import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LoggedInUSer } from '../../core/domain/loggedin.user';
import { SystemConstants } from '../../core/common/system.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }

  login(username: string, password: string) {
    let body = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password)
      + "&grant_type=password";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let option = new RequestOptions({ headers: headers })
    return this._http.post(SystemConstants.BASE_API + '/api/oauth/token', body, option).map((respone: Response) => {
      let user: LoggedInUSer = respone.json();
      if (user && user.access_token) {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
      }
    });
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }
  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    }
    else {
      return false;
    }
  }
  getLoggedInUser(): LoggedInUSer {
    let user: LoggedInUSer = null;
    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedInUSer(userData.access_token, userData.username, userData.password,
        userData.fullname, userData.email, userData.avatar);
    }
    return user;
  }
}
