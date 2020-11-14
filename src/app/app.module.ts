import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GiftListComponent } from './gift-list/gift-list.component';
import { PageBodyComponent } from './page-body/page-body.component';
import { MenuComponent } from './menu/menu.component';
import { GiftEntryComponent } from './gift-entry/gift-entry.component';
import { GiftListNavbarComponent } from './gift-list-navbar/gift-list-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { GiftTransactionProfileComponent } from './gift-transaction-profile/gift-transaction-profile.component';
import { TruncatePipe } from './pipes/truncate';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GiftListComponent,
    PageBodyComponent,
    MenuComponent,
    GiftEntryComponent,
    GiftListNavbarComponent,
    ProfilePageComponent,
    FeedPageComponent,
    GiftTransactionProfileComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
