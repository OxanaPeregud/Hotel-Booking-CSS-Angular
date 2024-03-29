import {Component, Input, OnInit} from '@angular/core';
import {HOTELS} from "../shared/models/hotels";
import {HotelService} from "../services/hotel.service";
import {Hotel} from "../shared/models/hotel";
import {PopupComponent} from "../popup/popup.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})
export class HotelInfoComponent implements OnInit {

  public hotels = HOTELS;
  public viewedHotels: number[] = [];
  public isFilter: boolean = false;
  public hotelsInCart: Hotel[] = [];
  @Input() public hotelsIds: number[] = [];
  @Input() public isProfile: boolean = false;

  constructor(private hotelService: HotelService,
              private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.hotelService.hotelSearchEvent.subscribe(search => {
      this.applyFilter(search);
    });
    if (this.isProfile) {
      if (this.hotelsIds.length != 0) {
        const orderedHotels: Hotel[] = [];
        this.hotels.forEach(item => {
          if (item.id && this.hotelsIds.includes(item.id)) {
            orderedHotels.push(item);
          }
        });
        this.hotels = orderedHotels;
      } else {
        this.hotels = [];
      }
    }
    this.userService.bookingEvent
      .subscribe(() => {
        this.hotelsInCart = [];
        this.isInCard(undefined);
      });
  }

  public setViewDetails(hotelId: number | undefined, view: boolean): void {
    if (view && hotelId) {
      this.viewedHotels.push(hotelId);
    } else {
      this.viewedHotels = this.viewedHotels.filter(item => item != hotelId);
    }
  }

  public containsViewId(hotelId: number | undefined): boolean {
    if (hotelId) {
      return this.viewedHotels.includes(hotelId);
    } else {
      return false;
    }
  }

  public applyFilter(data: any): void {
    this.hotels = HOTELS;
    if (data.search) {
      this.hotels = this.hotels.filter(item => item.country?.toLowerCase() == data.search.toLowerCase());
      if (this.hotels.length != 0) {
        this.isFilter = true;
      } else {
        this.hotels = HOTELS;
        this.isFilter = false;
        this.dialog.open(PopupComponent, {
          data: "Location not found"
        });
      }
    } else {
      this.isFilter = false;
    }
  }

  public isInCard(hotel: Hotel | undefined): boolean {
    const hotels = this.hotelsInCart.filter(item => item.id == hotel?.id);
    return hotels.length != 0;
  }

  public addToCart(hotel: Hotel | undefined) {
    if (hotel && !this.isInCard(hotel)) {
      this.hotelsInCart.push(hotel);
      this.dialog.open(PopupComponent, {
        data: "Hotel added to cart"
      });
    }
    this.hotelService.hotelAddToCartEvent.emit(this.hotelsInCart);
  }

  public removeFromCart(hotel: Hotel | undefined) {
    if (hotel) {
      this.hotelsInCart = this.hotelsInCart.filter(item => item.id != hotel.id);
      this.dialog.open(PopupComponent, {
          data: "Hotel removed from cart"
        }
      );
    }
    this.hotelService.hotelAddToCartEvent.emit(this.hotelsInCart);
  }
}
