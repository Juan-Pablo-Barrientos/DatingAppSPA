import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-memberCard',
  templateUrl: './memberCard.component.html',
  styleUrls: ['./memberCard.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user!: User;


  constructor() { }

  ngOnInit() {
  }

}
