import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';

import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { ErrorInterceptorProvider } from './modules/auth/services/error.interceptor';
import { AlertifyService } from './modules/shared/services/alertify.service';
import { UserFeaturesModule } from './modules/userFeatures/userFeatures.module';

@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    SharedModule,
    UserFeaturesModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
