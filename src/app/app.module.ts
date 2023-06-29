import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { ErrorInterceptorProvider } from './modules/auth/services/error.interceptor';
import { AlertifyService } from './modules/shared/services/alertify.service';
import { UserFeaturesModule } from './modules/userFeatures/userFeatures.module';
import { UserService } from './modules/auth/services/user.service';
import { MemberListComponent } from './modules/members/memberList/memberList.component';
import { MemberCardComponent } from './modules/members/memberCard/memberCard.component';
import { MemberDetailComponent } from './modules/members/memberDetail/memberDetail.component';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    SharedModule,
    UserFeaturesModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        disallowedRoutes: ['localhost:5000/api/auth'],
        allowedDomains: ['localhost:5000']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
