import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  @Output() hotelSearchEvent = new EventEmitter<any>();
  @Output() hotelAddToCartEvent = new EventEmitter<any>();

}
