import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from '../Models/gift';
import {GiftsService} from '../gifts.service'
import {CommonService} from '../common.service';

declare var $: any;

@Component({
  selector: 'app-gift-entry',
  templateUrl: './gift-entry.component.html',
  styleUrls: ['./gift-entry.component.css']
})
export class GiftEntryComponent implements OnInit {

  @Input() gift: Gift;
  gift_entry: Gift;
  // @Output() gift_to_delete = new EventEmitter<Gift>();
  @Output() gift_to_delete = new EventEmitter<Gift>();

  constructor(private giftsService: GiftsService,
    private commonService: CommonService) {}

  ngOnInit(): void {
    let g = this.gift;
    g.name = this.commonService.decodeHTML(this.gift.name);
    this.gift_entry = g;
  }

  sendGiftForDelete(): void {
    this.gift_to_delete.emit(this.gift_entry);
  }

}
