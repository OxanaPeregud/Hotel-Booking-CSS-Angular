import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {HomeComponent} from './home/home.component';
import {HotelsComponent} from './hotels/hotels.component';
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HotelInfoComponent} from './hotel-info/hotel-info.component';
import {HotelDetailsComponent} from './hotel-details/hotel-details.component';
import {MatTabsModule} from "@angular/material/tabs";
import {PackagesInfoComponent} from './packages-info/packages-info.component';
import {FlashOfferBannerComponent} from './flash-offer-banner/flash-offer-banner.component';
import {ReviewsSliderComponent} from './reviews-slider/reviews-slider.component';
import {NewsSubscribeComponent} from './news-subscribe/news-subscribe.component';
import {PopupComponent} from './popup/popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ActivitiesComponent} from './activities/activities.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HotelsComponent,
    HotelInfoComponent,
    HotelDetailsComponent,
    PackagesInfoComponent,
    FlashOfferBannerComponent,
    ReviewsSliderComponent,
    NewsSubscribeComponent,
    PopupComponent,
    ActivitiesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
