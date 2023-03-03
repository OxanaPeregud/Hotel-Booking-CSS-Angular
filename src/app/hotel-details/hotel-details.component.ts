import {Component, OnInit} from '@angular/core';
import {expand} from "../animations/app.animation";

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
  animations: [
    expand()
  ]
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
