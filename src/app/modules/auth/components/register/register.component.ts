import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any={};

  constructor(private http:HttpClient, private authService:AuthService) { }

  ngOnInit() {
  }


  register(){
    this.authService.register(this.model).subscribe({
      next: ()=>{
        console.log('registration successfull')
      },
      error: error =>{
        console.log(error);
      }
    })
  }

}
