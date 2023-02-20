import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})
export class HotelInfoComponent implements OnInit {

  public isViewDetails: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public setViewDetails(): void {
    this.isViewDetails = !this.isViewDetails;
  }
}
