import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { User } from 'src/app/modules/shared/models/User';
import { AlertifyService } from 'src/app/modules/shared/services/alertify.service';

@Component({
  selector: 'app-memberList',
  templateUrl: './memberList.component.html',
  styleUrls: ['./memberList.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[]=[];

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers().subscribe({
      next: (users:User[])=>{
        this.users=users
      },
      error: error=>{
        this.alertify.error(error)
      }
    })
  }

}
