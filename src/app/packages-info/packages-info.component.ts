import {Component, OnInit} from '@angular/core';
import {flyIn} from "../animations/app.animation";

@Component({
  selector: 'app-packages-info',
  templateUrl: './packages-info.component.html',
  styleUrls: ['./packages-info.component.scss'],
  animations: [
    flyIn()
  ]
})
export class PackagesInfoComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
