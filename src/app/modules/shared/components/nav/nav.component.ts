import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  token:any;

  model: any = {};

  constructor(private authService: AuthService) {
    this.token=localStorage.getItem('token')
  }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe({
      next: ()=> {
        this.token=localStorage.getItem('token')
        console.log('Logged in successfully');
      },
      error: error=>{
        console.log(error);
      }
    })
  }

  logOut(){
    localStorage.removeItem('token');
    this.token=localStorage.getItem('token')
    console.log('logged out')
  }

}
