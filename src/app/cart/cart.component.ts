import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Hotel} from "../shared/models/hotel";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public addedHotels: Hotel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.addedHotels = this.data;
    }
  }
}
