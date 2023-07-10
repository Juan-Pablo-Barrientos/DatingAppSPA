import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

jwtHelper = new JwtHelperService
savedToken:any;
decodedToken$:BehaviorSubject<any> = new BehaviorSubject<any>([])
currentUser!: User | null;
photoUrl = new BehaviorSubject<string> ('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();

baseUrl = environment.apiUrl+'auth/';

constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl : string){
    this.photoUrl.next(photoUrl);
  }

  login(model:any){
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response:any)=>{
        if(response){
          localStorage.setItem('token', response.token);
          this.decodedToken$.next(this.jwtHelper.decodeToken(response.token)) ;
          this.savedToken = response.token;
          localStorage.setItem('user',JSON.stringify(response.user));
          this.currentUser = response.user
          this.changeMemberPhoto(this.currentUser?.photoUrl!)
        }
      })
    )
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'register' , model);
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.savedToken=null
    this.decodedToken$.next(new BehaviorSubject<any>([]).value)
    this.currentUser = null;
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
