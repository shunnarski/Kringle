import { Component, OnInit } from '@angular/core';
import {GIFTS} from '../mock-gifts';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {

  gifts = GIFTS
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.gifts);
  }

}
