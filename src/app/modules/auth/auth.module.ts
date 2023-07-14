import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { NgbAlertModule, NgbDateStructAdapter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    JsonPipe
  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ]
})
export class AuthModule { }
