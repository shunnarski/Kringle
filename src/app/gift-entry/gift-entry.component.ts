import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from '../gift';

declare var $: any;

@Component({
  selector: 'app-gift-entry',
  templateUrl: './gift-entry.component.html',
  styleUrls: ['./gift-entry.component.css']
})
export class GiftEntryComponent implements OnInit {

  @Input() gift: Gift;
  gift_entry: Gift;
  // @Output() gift_to_delete = new EventEmitter<Gift>();
  @Output() gift_to_delete = new EventEmitter<Gift>();

  constructor() { 
  }

  ngOnInit(): void {
    this.gift_entry = this.gift;
  }

  logID(id: number): void {
    this.gift_to_delete.emit(this.gift_entry);
  }

}
