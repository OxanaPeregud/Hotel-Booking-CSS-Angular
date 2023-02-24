import {Component, OnInit} from '@angular/core';
import {HOTELS} from "../shared/models/hotels";
import {HotelService} from "../services/hotel.service";
import {Hotel} from "../shared/models/hotel";

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})
export class HotelInfoComponent implements OnInit {

  public hotels = HOTELS;
  public viewedHotels: number[] = [];
  public isFilter: boolean = false;

  constructor(private hotelService: HotelService) {
  }

  ngOnInit(): void {
    this.hotelService.hotelSearchEvent.subscribe(search => {
      this.applyFilter(search);
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
      this.isFilter = true;
    } else {
      this.isFilter = false;
    }
  }

  public addToCart(hotel: Hotel | undefined) {
      this.hotelService.hotelAddToCartEvent.emit(hotel);
  }
}
