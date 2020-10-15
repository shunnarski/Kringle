import { Component, OnInit } from '@angular/core';
import {Gift} from '../gift';
import {GiftsService} from '../gifts.service';
import {GIFTS} from '../mock-gifts';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {

  gifts: Gift[];
  mes: string;
  
  constructor(private giftService: GiftsService) { }

  ngOnInit(): void {
    this.giftService.getGifts("1234").subscribe(gifts => this.mes = gifts);
    this.gifts = GIFTS;
    // this.gifts = GIFTS;
  }

}
