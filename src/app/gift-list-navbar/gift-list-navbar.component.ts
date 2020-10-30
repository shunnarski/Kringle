import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from '../Models/gift';

@Component({
  selector: 'app-gift-list-navbar',
  templateUrl: './gift-list-navbar.component.html',
  styleUrls: ['./gift-list-navbar.component.css']
})
export class GiftListNavbarComponent implements OnInit {

  @Input() gifts: Gift[];
  @Output() filteredGifts = new EventEmitter<Gift[]>();

  constructor() { }

  ngOnInit(): void {
    
  }

  onSearchChange(searchValue: string): void {
    let searchValUpper = searchValue.toUpperCase();
    var gift_list = this.gifts.filter(g => {
      let gift_name = g.name.toUpperCase();
      return gift_name.indexOf(searchValUpper) > -1;
    });

    this.filteredGifts.emit(gift_list);
  }

  

}
