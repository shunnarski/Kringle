import { Injectable } from '@angular/core';
import {Gift} from './gift';
import {GIFTS} from './mock-gifts';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {

  constructor() { }

  addGift(gift: Gift): void {
    GIFTS.push(gift);
  }

  getGifts(): Gift[] {
    return GIFTS;
  }

  getAmazonGift(url: string): Gift {
    // scrape url content to get html information
    var amazonGift: Gift = {
      user_id: "1",
      id: 5,
      name: "Echo Dot (3rd Gen) - Smart speaker with Alexa - Charcoal",
      price: 39.99,
      link_url: url,
      photo_url: "https://images-na.ssl-images-amazon.com/images/I/61MZfowYoaL._AC_SL1000_.jpg",
      server: "amazon.com"
    };
    // amazonGift.id = GIFTS[GIFTS.length - 1].id + 1;
    // var xmlhttp=new XMLHttpRequest();

    // // xmlhttp.onreadystatechange=function()
    // // {
    // //     if (xmlhttp.readyState==4 && xmlhttp.status==200)
    // //     {
    // //         return xmlhttp.responseText;
    // //     }
    // // }
    // xmlhttp.open("GET", url, false );
    // xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000")

    // xmlhttp.send();

    // console.log(xmlhttp);

    return amazonGift;

    // this.addGift(amazonGift);
  }

}
