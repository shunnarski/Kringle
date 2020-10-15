import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserBioComponent } from './user-bio/user-bio.component';
import { GiftListComponent } from './gift-list/gift-list.component';
import { PageBodyComponent } from './page-body/page-body.component';
import { MenuComponent } from './menu/menu.component';
import { GiftEntryComponent } from './gift-entry/gift-entry.component';
import { GiftListNavbarComponent } from './gift-list-navbar/gift-list-navbar.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserBioComponent,
    GiftListComponent,
    PageBodyComponent,
    MenuComponent,
    GiftEntryComponent,
    GiftListNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
