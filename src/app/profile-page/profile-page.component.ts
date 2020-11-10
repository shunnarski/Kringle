import { Component, OnInit } from '@angular/core';
import {User, Profile} from '../Models/user';
import {MOCK_USER1} from '../mock-user';
import {Gift, GiftTransaction} from '../Models/gift';
import {MOCK_GIFT_TRANSACTIONS} from '../mock_gift_transactions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: User;
  gift_list: Gift[];
  gifts_received_num: number;
  gifts_given_num: number;
  gift_transactions: GiftTransaction[];

  constructor() { }

  ngOnInit(): void {
    this.user = MOCK_USER1;
    this.user.gift_transactions = MOCK_GIFT_TRANSACTIONS;
    this.gifts_received_num = 0;
    this.gifts_given_num = 0;
    this.user.gift_transactions.map(gt => {
      if(gt.giver.user_id == this.user.user_id) {
        this.gifts_given_num += 1;
      }
      else if(gt.receiver.user_id == this.user.user_id) {
        this.gifts_received_num += 1;
      }
    })

    console.log(this.user);
  }

}
