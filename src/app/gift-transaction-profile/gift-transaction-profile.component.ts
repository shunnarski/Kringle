import { Component, OnInit, Input } from '@angular/core';
import { Gift, GiftTransaction } from '../Models/gift';
import { User } from '../Models/user';

@Component({
  selector: 'app-gift-transaction-profile',
  templateUrl: './gift-transaction-profile.component.html',
  styleUrls: ['./gift-transaction-profile.component.css']
})
export class GiftTransactionProfileComponent implements OnInit {

  @Input() gift_transaction: GiftTransaction;
  @Input() user: string;

  constructor() { }

  ngOnInit(): void {
  }

}
