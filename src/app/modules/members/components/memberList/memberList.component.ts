import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private userService: UserService, private alertify: AlertifyService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.users = data['users']
    })
  }
}
