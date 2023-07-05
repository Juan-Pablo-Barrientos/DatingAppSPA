import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/shared/components/home/home.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { UserLikesListComponent } from './modules/userFeatures/components/userLikesList/userLikesList.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { memberDetailResolver } from './modules/members/resolver/memberDetail.resolver';
import { UserService } from './modules/auth/services/user.service';
import { AlertifyService } from './modules/shared/services/alertify.service';
import { memberListResolver } from './modules/members/resolver/memberList.resolver';
import { MemberDetailComponent } from './modules/members/components/memberDetail/memberDetail.component';
import { MemberEditComponent } from './modules/members/components/memberEdit/memberEdit.component';
import { MessagesComponent } from './modules/userFeatures/components/messages/messages.component';
import { MemberListComponent } from './modules/members/components/memberList/memberList.component';
import { memberEditResolver } from './modules/members/resolver/memberEdit.resolver';
import { preventUnsavedChanges } from './modules/auth/guards/preventUnsavedChanges.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component: RegisterComponent, title:'Dating App: Register'},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[authGuard],
    children:[
      {path:'members', component: MemberListComponent, title:'Dating App',
        resolve:{users: memberListResolver}},
      {path:'members/:id', component: MemberDetailComponent, title:'Dating App',
        resolve:{user: memberDetailResolver}},
      {path:'member/edit', component: MemberEditComponent, title:'Dating App',
        resolve:{user: memberEditResolver},
        canDeactivate:[preventUnsavedChanges]                   },
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
