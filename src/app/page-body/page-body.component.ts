import { Component, OnInit } from '@angular/core';
import {GIFTS} from '../mock-gifts';
import { Gift } from '../gift';
import {GiftsService} from '../gifts.service';

declare var $: any;

@Component({
  selector: 'app-page-body',
  templateUrl: './page-body.component.html',
  styleUrls: ['./page-body.component.css']
})
export class PageBodyComponent implements OnInit {

  gift_list: Gift[];
  newGift = new Gift();
  user_id = "1234";
  gift_list_all: Gift[];
  
  constructor(private giftService: GiftsService) { }

  ngOnInit(): void {

    let toastOptions = {
      animation: true,
      autohide: true,
      delay: 3000
    };
    $('.toast').toast(toastOptions);

    this.newGift.name = "";
    $("#itemURLMessage").hide();

    this.getGiftsFromServer();

  }

  getGiftsFromServer(): void {
    // get gifts from server
    this.giftService.getGifts(this.user_id).subscribe(g => {
      this.gift_list_all = g['gifts'];
      this.gift_list = g['gifts'];
    });

    // set gift list read by gift entry component to start with all gifts from server
  }

  addGiftToList(): void {
    let itemURL = $("#itemURL");
    let modal = $("#addGiftModal");

    if(!itemURL.val()) {
      $("#itemURLMessage").show();
    }
    else {

      // add service here that adds a new amazon product based on the url
      let newGift = this.giftService.getAmazonGift(itemURL.val(), this.user_id);
      this.gift_list = this.giftService.addGift(newGift, this.gift_list);

      // modal cleanup
      modal.modal('hide');
      itemURL.val("");

      // success toast
      this.newGift = newGift;
      $('#addGiftSuccessToast').toast('show');
      $("#itemURLMessage").hide();

    }
  }

  setGiftList(gift_list: Gift[]) {
    this.gift_list = gift_list;
    console.log(this.gift_list);
  }

  deleteGiftFromList() : void {
    console.log(this.newGift)
  }

  filterGifts(gifts: Gift[]) {
    this.gift_list = gifts;
  }

}
