import { Register } from './../_models/Register';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  baseUrl = environment.apiUrl+'Auth/';
  decodedToken:any;

  constructor(private http: HttpClient) {

    const token = localStorage.getItem('token');

    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) { localStorage.setItem('token', user.token);


      }
      }))
  }

  register(model:any) {
    console.log(this.baseUrl + 'register');
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {

    try{const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);}
    catch{
      return false
    }




  }


}
