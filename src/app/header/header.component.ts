import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SignInFormComponent} from "../sign-in-form/sign-in-form.component";
import {UserService} from "../services/user.service";
import {User} from "../shared/models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public formControl = new FormControl('');
  public user: User | undefined;

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private router: Router) {
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
}
