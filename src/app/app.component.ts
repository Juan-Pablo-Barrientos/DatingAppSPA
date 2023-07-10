import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './modules/shared/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  jwtHelper = new JwtHelperService;

  constructor (private authService: AuthService){
  }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user')!)
    this.authService.loggedIn()
    if(user){
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }

}
