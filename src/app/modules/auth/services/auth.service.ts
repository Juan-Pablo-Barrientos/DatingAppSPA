import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

jwtHelper = new JwtHelperService
savedToken:any;
decodedToken$:BehaviorSubject<any> = new BehaviorSubject<any>([])

baseUrl = "http://localhost:5000/api/auth/";

constructor(private http: HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response:any)=>{
        const user=response;
        if(user){
          localStorage.setItem('token', user.token);
          this.decodedToken$.next(this.jwtHelper.decodeToken(user.token)) ;
          this.savedToken = user.token;
        }
      })
    )
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'register' , model);
  }

  logOut(){
    localStorage.removeItem('token');
    this.savedToken=null
    this.decodedToken$.next(new BehaviorSubject<any>([]).value)
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (!this.jwtHelper.isTokenExpired(token)){
      this.decodedToken$.next(this.jwtHelper.decodeToken(token!))
      this.savedToken = localStorage.getItem('token')
      return true
    }
    return false;
  }

}
