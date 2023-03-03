import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Hotel} from "../shared/models/hotel";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../shared/models/user";
import {SignInFormComponent} from "../sign-in-form/sign-in-form.component";
import {PopupComponent} from "../popup/popup.component";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public addedHotels: Hotel[] = [];
  public totalSum: number = 0;
  public user!: User;

  public displayedColumns = [
    'name',
    'country',
    'price'
  ];

  public dataSource!: MatTableDataSource<Hotel>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<CartComponent>,
              private dialog: MatDialog,
              private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.data && this.data.hotelsInCart) {
      this.applyList();
    }
  }

  public applyList(): void {
    this.addedHotels = this.data.hotelsInCart;
    if (this.addedHotels.length != 0) {
      this.totalSum = this.addedHotels
        .map(hotel => Number(hotel.price))
        .reduce((a, b) => a + b, 0);
    }
    this.dataSource = new MatTableDataSource(this.addedHotels);
  }

  public confirmSubmit(): void {
    const orderedHotelsIds: number[] = this.addedHotels.map(hotel => Number(hotel.id));
    if (this.data && this.data.user) {
      this.user = this.data.user;
      if (this.user.orderedHotelsIds) {
        this.user.orderedHotelsIds = this.user.orderedHotelsIds.concat(orderedHotelsIds);
      } else {
        this.user.orderedHotelsIds = orderedHotelsIds;
      }
      this.userService.updateUser(this.user, this.data.user.id).subscribe(data => {
        if (data) {
          this.userService.userUpdateEvent.emit(this.data.user.id);
          this.dialog.open(PopupComponent, {
            width: '500px',
            data: "Thank you for booking! Our manager will contact you soon"
          });
          this.userService.bookingEvent.emit();
        }
      });
    } else {
      this.openSignInForm(orderedHotelsIds);
    }
    this.dialogRef.close();
  }

  public openSignInForm(orderedHotelsIds: number[]): void {
    this.dialog.open(SignInFormComponent, {
      width: '500px',
      disableClose: true,
      data: {
        orderedHotelsIds: orderedHotelsIds
      }
    });
  }
}
