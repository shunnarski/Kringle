import { Injectable } from '@angular/core';
import {Gift} from './gift';
import {GIFTS} from './mock-gifts';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class GiftsService {

  constructor(private http: HttpClient) { }

  addGift(gift: Gift, gift_list: Gift[]): Gift[] {
    var gifts = gift_list;
    gifts.push(gift);
    return gifts;
  }

  deleteGift(id: number, gift_list: Gift[]): Gift[] {
    var gifts = [];
    
    gift_list.map(g => {
      if(g.id !== id) {
        gifts.push(g);
      }
    })

    return gifts;
  }

  getGifts(user_id: string): Observable<Gift[]> {
    const req = 'getGiftListForUser/' + user_id;
    const url = environment.nodeServer + req;
    return this.http.get<Gift[]>(url);
  }

  getAmazonGift(url: string, user_id: string): Gift {


    var amazonGift: Gift = {
      user_id: user_id,
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
