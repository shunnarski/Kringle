import { Component, OnInit } from '@angular/core';
import {Gift} from '../gift';
import {GiftsService} from '../gifts.service';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {

  gifts: Gift[];
  
  constructor(private giftService: GiftsService) { }

  ngOnInit(): void {

    this.gifts = this.giftService.getGifts();
  }

}
