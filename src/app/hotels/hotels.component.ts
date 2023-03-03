import { Component, OnInit } from '@angular/core';
import {flyIn} from "../animations/app.animation";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  animations: [
    flyIn()
  ]
})
export class HotelsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
