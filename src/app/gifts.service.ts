import { Injectable } from '@angular/core';
import {Gift} from './Models/gift';
import {GIFTS} from './mock-gifts';
import {Observable, forkJoin} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class GiftsService {
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  addGift(gift: Gift, gift_list: Gift[]): Gift[] {
    var gifts = gift_list;
    const req = "addGiftToList";
    const url = environment.nodeServer + req;
    // GIFTS.forEach(g => {
    //   this.http.post<Gift>(url, g, this.httpOptions).subscribe();
    // })

    this.http.post<Gift>(url, gift, this.httpOptions).subscribe();
    gifts.push(gift);
    return gifts;
  }

  deleteGift(gift: Gift, gift_list: Gift[]): Gift[] {
    var gifts = [];

    const req = "deleteGiftFromList";
    const url = environment.nodeServer + req;
    this.http.post<Gift>(url, gift, this.httpOptions).subscribe();
    
    gift_list.map(g => {
      if(g.id !== gift.id) {
        gifts.push(g);
      }
    });

    return gifts;
  }

  getGifts(user_id: string): Observable<Gift[]> {
    const req = 'getGiftListForUser/' + user_id;
    const url = environment.nodeServer + req;
    return this.http.get<Gift[]>(url);
  }

  getEtsyGiftInfo(url: string): Observable<Gift> {
    var url_mod = url.split('listing/');
    let listing_id = url_mod[1].split('/')[0];
    const req = "getEtsyInfo/" + listing_id;
    const req_url = environment.nodeServer + req;
    
    // get etsy info
    return this.http.get<Gift>(req_url);
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

    // var amazonGift = new Gift();

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
    // xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language");
    // xmlhttp.send();

    // console.log(xmlhttp);

    return amazonGift;

    // this.addGift(amazonGift);
  }



}
