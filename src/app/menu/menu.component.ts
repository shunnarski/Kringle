import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  comp1 = {
    name: "Gifts"
  }

  comp2 = {
    name: "Profile"
  }

  comp3 = {
    name: "Settings"
  }

  menu_comps = [this.comp1, this.comp2, this.comp3];

  selectedComponent = this.comp1;
  
  constructor() { 
    
    
  }

  ngOnInit(): void {
  }

  onSelect(menu_comp): void {
    this.selectedComponent = menu_comp;
  }
}
