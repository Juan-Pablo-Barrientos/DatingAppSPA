import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modules/shared/models/User';

@Component({
  selector: 'app-memberDetail',
  templateUrl: './memberDetail.component.html',
  styleUrls: ['./memberDetail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user!: User;

  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.user = data['user']
      console.log(this.user)
    })
  }

}
