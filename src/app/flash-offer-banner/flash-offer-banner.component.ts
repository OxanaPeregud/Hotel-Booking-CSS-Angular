import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-flash-offer-banner',
  templateUrl: './flash-offer-banner.component.html',
  styleUrls: ['./flash-offer-banner.component.scss']
})
export class FlashOfferBannerComponent implements OnInit {

  @Input()
  public isLargeHidden!: boolean;

  @Input()
  public isSmallHidden!: boolean;

  public title = "Flash Offer";

  constructor() {
  }

  ngOnInit(): void {
  }
}
