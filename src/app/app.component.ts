import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kringle';

  constructor() {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile(): void{
    console.log("need to load user profile on initialization")
  }
}
