import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from 'src/app/modules/shared/services/alertify.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/modules/shared/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedDate!: NgbDateStruct | null;
  selectedDateAsString!: string;
  registerForm!: FormGroup;
  user!: User;

  constructor(private ngbDateParserFormatter: NgbDateParserFormatter, private router:Router,private http:HttpClient, private authService:AuthService, private alertify: AlertifyService, private fb: FormBuilder, private calendar: NgbCalendar) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  };

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.minLength(4), Validators.required, Validators.maxLength(8)]],
      confirmPassword: ['',Validators.required]
    },{validator:this.passwordMatchValidator})
  }

  register(){
    if(this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.user.dateOfBirth = this.selectedDateAsString;
      console.log(this.user)
      this.authService.register(this.user).subscribe({
        next: () =>{
          this.alertify.success('Registration successful');
        },
        error: error =>{
          this.alertify.error(error);
        },
        complete: () =>{
          this.authService.login(this.user).subscribe({
            next: () =>{
              this.router.navigate(['/members']);
            }
          })
        }
      })
    }
  }

  onDateChange(date: NgbDate | null) {
    this.selectedDate = date;
    this.selectedDateAsString = date ? this.formatDate(date) : '';
    console.log(this.selectedDateAsString);
  }

  formatDate(date: NgbDate): string {
    return this.ngbDateParserFormatter.format(date);
  }
}
