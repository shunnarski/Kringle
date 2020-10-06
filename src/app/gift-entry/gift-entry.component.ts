import { Component, OnInit, Input } from '@angular/core';
import { Gift } from '../gift';

@Component({
  selector: 'app-gift-entry',
  templateUrl: './gift-entry.component.html',
  styleUrls: ['./gift-entry.component.css']
})
export class GiftEntryComponent implements OnInit {

  @Input() gift: Gift;

  constructor() { }

  ngOnInit(): void {
  }

}
