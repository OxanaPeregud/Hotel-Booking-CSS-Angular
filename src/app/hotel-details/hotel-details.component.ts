import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  public activeTab: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  public setActiveTab(activeTab: number): void {
    this.activeTab = activeTab;
  }
}
