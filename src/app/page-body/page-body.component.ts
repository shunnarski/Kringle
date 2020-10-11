import { Component, OnInit } from '@angular/core';
import {GIFTS} from '../mock-gifts';
import { Gift } from '../gift';

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

  constructor() { }

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
      console.log("error");
    }
    else {

      var gift: Gift = {
        id: 5,
        name: "Echo Dot (3rd Gen) - Smart speaker with Alexa - Charcoal",
        price: 39.99,
        link_url: itemURL.val(),
        photo_url: "https://images-na.ssl-images-amazon.com/images/I/61MZfowYoaL._AC_SL1000_.jpg"
      };
      
      GIFTS.push(gift);

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
