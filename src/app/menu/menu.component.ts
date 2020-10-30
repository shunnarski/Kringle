import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu_comps = ['Gifts', 'Profile', 'Feed']

  selectedComponent = "Gifts";
  @Output() activePage = new EventEmitter<string>();
  
  constructor() { 
    
    
  }

  ngOnInit(): void {
  }

  onSelect(menu_comp): void {
    this.selectedComponent = menu_comp;
    this.activePage.emit(menu_comp);
  }
}
