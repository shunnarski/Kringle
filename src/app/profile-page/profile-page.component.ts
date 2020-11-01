import { Component, OnInit } from '@angular/core';
import {User, Profile} from '../Models/user';
import {MOCK_USER1} from '../mock-user';
import {Gift} from '../Models/gift';
import {MOCK_GIFT_TRANSACTIONS_RECEIVED, MOCK_GIFT_TRANSACTIONS_GIVEN} from '../mock_gift_transactions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: User;
  gift_list: Gift[];
  gifts_received: Gift[];
  gifts_given: Gift[];

  constructor() { }

  ngOnInit(): void {
    this.user = MOCK_USER1;
    this.user.gifts_received = MOCK_GIFT_TRANSACTIONS_RECEIVED;
    this.user.gifts_given = MOCK_GIFT_TRANSACTIONS_GIVEN;
    console.log(this.user);
  }

}
