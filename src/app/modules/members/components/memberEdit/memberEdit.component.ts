import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { User } from 'src/app/modules/shared/models/User';
import { AlertifyService } from 'src/app/modules/shared/services/alertify.service';

@Component({
  selector: 'app-memberEdit',
  templateUrl: './memberEdit.component.html',
  styleUrls: ['./memberEdit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!:NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event:any){
    if (this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  user!:User;
  photoUrl!:string;

  constructor(private route:ActivatedRoute, private alertify: AlertifyService, private userService: UserService, private authService:AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.user = data['user'];
    })
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl)
  }

  updateUser(){
    let userNameId=this.authService.jwtHelper.decodeToken(this.authService.savedToken).nameid
    this.userService.updateUser(userNameId, this.user).subscribe({
      next: ()=>{
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.user);
      },
      error: error=>{
        this.alertify.error(error)
      }
    });
  }

  updateMainPhoto(photoUrl: string){
    this.user.photoUrl = photoUrl;
  }

}
