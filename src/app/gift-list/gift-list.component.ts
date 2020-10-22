import { Component, OnInit } from '@angular/core';
import {Gift} from '../gift';
import {GiftsService} from '../gifts.service';
import {GIFTS} from '../mock-gifts';

declare var $ : any;

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {

  gifts: Gift[];
  mes: string;

  gift_to_delete = new Gift();
  
  constructor(private giftService: GiftsService) { }

  ngOnInit(): void {
    this.giftService.getGifts("1234").subscribe(gifts => this.mes = gifts);
    this.gifts = GIFTS;
  }

  deleteGiftFromList(id: number): void {
    let modal = $("#deleteGiftModal");

    this.gifts = this.giftService.deleteGift(id, this.gifts);

    // post function clean up
    modal.modal('hide');

  }

  myCallback(gift: Gift) {
    this.gift_to_delete = gift;
  }

}
