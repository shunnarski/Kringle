import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {Gift} from '../Models/gift';
import {GiftsService} from '../gifts.service';
import {GIFTS} from '../mock-gifts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var $ : any;

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {

  @Input() gifts: Gift[];
  mes: string;
  user_id = "1234";
  gift_to_delete = new Gift();
  
  constructor(private giftService: GiftsService) { }

  ngOnInit(): void {

    // output the list to page body so add gift modal can modify the gift list
    // this.outputGiftList();
  }

  deleteGiftFromList(id: number): void {
    let modal = $("#deleteGiftModal");

    this.gifts = this.giftService.deleteGift(this.gift_to_delete, this.gifts);

    // post function clean up
    modal.modal('hide');

  }

  setGiftToDelete(gift: Gift): void {
    this.gift_to_delete = gift;
  }

}
