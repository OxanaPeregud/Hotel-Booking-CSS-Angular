import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../shared/models/user";
import {MatDialog} from "@angular/material/dialog";
import {UpdateProfileFormComponent} from "../update-profile-form/update-profile-form.component";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {toBase64} from "../shared/file";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User = new User();
  public isViewOrders: boolean = false;
  @ViewChild('avatar') public input: any;

  constructor(private dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.userService.userUpdateEvent
      .subscribe(() => {
        this.getUser();
      });
    this.userService.userSignOutEvent.subscribe(() => {
      this.user = new User();
    });
  }

  public setViewOrders(): void {
    this.isViewOrders = !this.isViewOrders;
  }

  public getUser(): void {
    const userId = this.activeRoute.snapshot.params['id'];
    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        if (data.length != 0) {
          this.user = data[0];
        }
      });
    }
  }

  public openUpdateProfileForm(): void {
    this.dialog.open(UpdateProfileFormComponent, {
        width: '1000px',
        data: this.user
      }
    );
  }

  public onChangeFile(event: any): void {
    const file: File = event.target.files[0];
    toBase64(file as Blob).then(bytes => {
      this.user.image = String(bytes);
      if (this.user && this.user.id) {
        this.userService.updateUser(this.user, this.user.id).subscribe(data => {
          if (data) {
            this.userService.userUpdateEvent.emit(this.user.id);
          }
        });
      }
    });
  }

  public deleteFile(): void {
    this.user.image = undefined;
    this.input.nativeElement.value = '';
    if (this.user && this.user.id) {
      this.userService.updateUser(this.user, this.user.id).subscribe(data => {
        if (data) {
          this.userService.userUpdateEvent.emit(this.user.id);
        }
      });
    }
  }
}
