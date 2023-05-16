import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/shared/components/home/home.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    title:'Dating App'
  },
  {
    path:'register',
    component: RegisterComponent,
    title:'Dating App: Register'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
