import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from 'src/app/modules/shared/services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any={};

  constructor(private http:HttpClient, private authService:AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }


  register(){
    this.authService.register(this.model).subscribe({
      next: ()=>{
        this.alertify.success('registration successfull')
      },
      error: error =>{
        this.alertify.error(error.message);
      }
    })
  }

}
