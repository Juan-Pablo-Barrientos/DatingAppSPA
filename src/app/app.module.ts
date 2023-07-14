import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FileUploadModule } from 'ng2-file-upload';
import { AlertifyService } from './modules/shared/services/alertify.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { ErrorInterceptorProvider } from './modules/auth/services/error.interceptor';
import { UserFeaturesModule } from './modules/userFeatures/userFeatures.module';
import { UserService } from './modules/auth/services/user.service';
import { MemberCardComponent } from './modules/members/components/memberCard/memberCard.component';
import { MemberEditComponent } from './modules/members/components/memberEdit/memberEdit.component';
import { MemberListComponent } from './modules/members/components/memberList/memberList.component';
import { MemberDetailComponent } from './modules/members/components/memberDetail/memberDetail.component';
import { PhotoEditComponent } from './modules/members/components/photoEdit/photoEdit.component';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    FileUploadModule,
    UserFeaturesModule,
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        disallowedRoutes: ['localhost:5000/api/auth'],
        allowedDomains: ['localhost:5000']
      }
    }),
    NgbModule
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
