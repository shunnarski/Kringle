import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserBioComponent } from './user-bio/user-bio.component';
import { GiftListComponent } from './gift-list/gift-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserBioComponent,
    GiftListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
