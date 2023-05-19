import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  decodedToken:any;
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService) {
  }

  ngOnInit() {
    this.authService.decodedToken$.subscribe((response) =>{
        this.decodedToken = response
    })
  }

  login(){
    this.authService.login(this.model).subscribe({
      next: ()=> {
        this.alertify.success('logged in successfully')
      },
      error: error=>{
        this.alertify.error(error.message);
      }
    })
  }

  logOut(){
    this.authService.logOut();
    this.alertify.message('logged out')
  }

}
