import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public myControl = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
  }

  public search(): void {
  }
}
