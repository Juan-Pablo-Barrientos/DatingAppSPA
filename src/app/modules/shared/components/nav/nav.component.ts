import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  decodedToken:any;
  model: any = {};
  photoUrl!: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router:Router) {
  }

  ngOnInit() {
    this.authService.decodedToken$.subscribe((response) =>{
        this.decodedToken = response
    })
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl)
  }

  login(){
    this.authService.login(this.model).subscribe({
      next: ()=> {
        this.alertify.success('logged in successfully');
      },
      error: error=>{
        this.alertify.error(error.message);
      },
      complete: ()=>{
        this.router.navigate(['/members']);
      }
    })
  }

  logOut(){
    this.authService.logOut();
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
