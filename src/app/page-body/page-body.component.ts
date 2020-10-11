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


  newGift: Gift = {
    id: 0,
    name: "",
    price: 0.0,
    link_url: "",
    photo_url: ""
  };

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

  }

  addGiftToList(): void {
    // let itemURL = document.getElementById("itemURL");
    let itemURL = $("#itemURL");
    // let itemURLMessage = $("#itemURLMessage");
    let modal = $("#addGiftModal");

    if(!itemURL.val()) {
      $("#itemURLMessage").show();
    }
    else {

      // add service here that adds a new amazon product based on the url
      let gift = this.giftService.getAmazonGift(itemURL.val());
      this.giftService.addGift(gift);

      // modal cleanup
      modal.modal('hide');
      itemURL.val("");

      // success toast
      this.newGift = gift;
      $('#addGiftSuccessToast').toast('show');
      $("#itemURLMessage").hide();

    }

    
  }

}
