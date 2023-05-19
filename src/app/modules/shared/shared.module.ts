import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModule } from '../auth/auth.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ErrorInterceptorProvider } from '../auth/services/error.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    NavComponent,
    FooterComponent,
    HomeComponent
  ],
  exports: [
    FooterComponent,
    NavComponent,
    HomeComponent
  ]
})
export class SharedModule { }
