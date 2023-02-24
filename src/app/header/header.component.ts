import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SignInFormComponent} from "../sign-in-form/sign-in-form.component";
import {UserService} from "../services/user.service";
import {User} from "../shared/models/user";
import {Router} from "@angular/router";
import {HotelService} from "../services/hotel.service";
import {Hotel} from "../shared/models/hotel";
import {PopupComponent} from "../popup/popup.component";
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: User | undefined;
  public form!: FormGroup;
  public hotelsInCart: Hotel[] = [];

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private hotelService: HotelService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userService.userSignInEvent
      .subscribe((id) => {
        this.getUser(id);
      });
    this.userService.userUpdateEvent
      .subscribe((id) => {
        this.getUser(id);
      });
    this.hotelService.hotelAddToCartEvent
      .subscribe((hotels) => {
        this.addToCart(hotels);
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      search: null
    });
  }

  public getUser(userId: number): void {
    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        if (data.length != 0) {
          this.user = data[0];
        }
      });
    }
  }

  public search(): void {
    this.hotelService.hotelSearchEvent.emit(this.form.value);
  }

  public openSignInForm(): void {
    this.dialog.open(SignInFormComponent, {
        width: '500px',
        disableClose: true
      }
    );
  }

  public goToProfile(): void {
    if (this.user) {
      this.router.navigate(['/profile', this.user.id]);
    }
  }

  public signOut(): void {
    const pathname: string = window.location.pathname;
    if (pathname.includes("profile")) {
      this.router.navigate(['/home']);
    }
    this.user = undefined;
    this.userService.userSignOutEvent.emit();
  }

  public addToCart(hotels: Hotel[]): void {
    this.hotelsInCart = hotels;
  }

  public openCart(): void {
    this.dialog.open(CartComponent, {
        width: '500px',
        data: this.hotelsInCart
      }
    );
  }
}
