import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/shared/components/home/home.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { MemberListComponent } from './modules/members/memberList/memberList.component';
import { UserLikesListComponent } from './modules/userFeatures/components/userLikesList/userLikesList.component';
import { MessagesComponent } from './modules/userFeatures/components/messages/messages.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { MemberDetailComponent } from './modules/members/memberDetail/memberDetail.component';
import { memberDetailResolver } from './modules/members/resolver/memberDetail.resolver';
import { UserService } from './modules/auth/services/user.service';
import { AlertifyService } from './modules/shared/services/alertify.service';
import { memberListResolver } from './modules/members/resolver/memberList.resolver';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component: RegisterComponent, title:'Dating App: Register'},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[authGuard],
    children:[
      {path:'members', component: MemberListComponent, title:'Dating App',
        resolve:{users:memberListResolver}},
      {path:'members/:id', component: MemberDetailComponent, title:'Dating App',
        resolve:{user: memberDetailResolver}},
      {path:'userLikesList', component: UserLikesListComponent, title:'Dating App'},
      {path:'messages', component: MessagesComponent, title:'Dating App'},
    ]
  },
  {path:'home', component: HomeComponent, title:'Dating App'},
  {path:'**', redirectTo:'', pathMatch:'full', title:'Dating App'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
