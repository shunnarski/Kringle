import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu_comps = ['Gifts', 'Profile', 'Settings']

  selectedComponent = "Gifts";
  
  constructor() { 
    
    
  }

  ngOnInit(): void {
  }

  onSelect(menu_comp): void {
    this.selectedComponent = menu_comp;
  }
}
