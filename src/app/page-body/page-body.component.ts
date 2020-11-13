import { Component, OnInit } from '@angular/core';
import {GIFTS} from '../mock-gifts';
import { Gift } from '../Models/gift';
import {GiftsService} from '../gifts.service';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { ProfilePageComponent } from '../profile-page/profile-page.component';

declare var $: any;

@Component({
  selector: 'app-page-body',
  animations: [
    trigger('pageTransition', [
      transition(':enter', [
        style({opacity: 0}),
        animate('0.5s ease-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('0.5s ease-in', style({opacity: 0}))
      ])
    ])
  ],
  templateUrl: './page-body.component.html',
  styleUrls: ['./page-body.component.css']
})
export class PageBodyComponent implements OnInit {

  gift_list: Gift[];
  newGift = new Gift();
  user_id = "1234";
  gift_list_filter: Gift[];
  activePage: string;

  
  constructor(private giftService: GiftsService) { }

  ngOnInit(): void {

    let toastOptions = {
      animation: true,
      autohide: true,
      delay: 3000
    };
    $('.toast').toast(toastOptions);

    this.newGift.name = "";
    this.activePage = "Profile";
    $("#itemURLMessage").hide();

    this.getGiftsFromServer();

  }

  getGiftsFromServer(): void {
    // get gifts from server
    this.giftService.getGifts(this.user_id).subscribe(g => {
      this.gift_list_filter = g['gifts'];
      this.gift_list = g['gifts'];
    });

    // set gift list read by gift entry component to start with all gifts from server
  }

  // async setNewGift(itemURL: string): Promise<Gift> {
  //   const result = await this.giftService.getEtsyGiftInfo(itemURL).toPromise().then(g => this.newGift = g);
  //   console.log(this.newGift);
  //   return result;
  // }

  addGiftToList(): void {
    let itemURL = $("#itemURL").val();
    let modal = $("#addGiftModal");

    if(!itemURL) {
      $("#itemURLMessage").show();
    }
    else {

      let new_id = this.gift_list[this.gift_list.length - 1].id + 1;
      console.log(this.newGift);
      // add service here that adds a new amazon product based on the url
      this.giftService.getEtsyGiftInfo(itemURL).subscribe(ng => {
        let newGift = ng;
        newGift.link_url = itemURL;
        newGift.id = new_id;
        newGift.user_id = this.user_id;
        this.newGift = newGift;
        this.giftService.addGift(this.newGift, this.gift_list)
      });

      // modal cleanup
      modal.modal('hide');
      $("#itemURL").val("");

      // success toast
      // this.newGift = newGift;
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
    this.gift_list_filter = gifts;
  }

  setActivePage(activePage: string) {
    this.activePage = activePage;
  }

}
