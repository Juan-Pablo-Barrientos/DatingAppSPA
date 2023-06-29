import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { UserService } from '../../auth/services/user.service';
import { AlertifyService } from '../../shared/services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memberDetail',
  templateUrl: './memberDetail.component.html',
  styleUrls: ['./memberDetail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user?: User;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(){
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe({
      next: (user:User)=>{
        this.user = user
      },
      error: error=>{
        this.alertify.error(error)
      }
    })
  }

}
