import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormBuilderService} from "../services/form-builder.service";
import {Router} from "@angular/router";
import {User} from "../shared/models/user";
import {UserService} from "../services/user.service";
import {PopupComponent} from "../popup/popup.component";

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  public form!: FormGroup;
  public isSignIn: boolean = true;
  public user!: User;

  public formErrorsSignIn: any = {
    'email': '',
    'password': ''
  };

  private validationMessagesSignIn: any = {
    'email': {
      'required': 'Email is required',
      'pattern': 'Email is not valid'
    },
    'password': {
      'required': 'Password is required'
    }
  };

  public formErrorsSignUp: any = {
    'email': '',
    'password': '',
    'firstName': ''
  };

  private validationMessagesSignUp: any = {
    'email': {
      'required': 'Email is required',
      'pattern': 'Email is not valid'
    },
    'password': {
      'required': 'Password is required'
    },
    'firstName': {
      'required': 'First Name is required'
    }
  };

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private formBuilderService: FormBuilderService,
              private dialogRef: MatDialogRef<SignInFormComponent>,
              private router: Router,
              private userService: UserService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, Validators.required]
    });
    this.form.valueChanges
      .subscribe(() =>
        this.formBuilderService.onFormValueChanged(this.form, this.formErrorsSignIn, this.validationMessagesSignIn));
  }

  public onSubmit(): void {
    this.user = this.form.value;
    if (!this.isSignIn) {
      this.userService.checkIfEmailExists(this.user).subscribe(data => {
        if (data.length != 0) {
          this.openMessagePopup("User with this email already exists");
        } else {
          this.userService.saveUser(this.user).subscribe(data => {
            if (data) {
              this.form.reset();
              this.dialogRef.close();
              this.userService.userSignInEvent.emit(data.id);
              this.router.navigate(['/profile', data.id]);
            }
          });
        }
      });
    } else {
      this.userService.getUser(this.user).subscribe(data => {
        if (data.length == 0) {
          this.openMessagePopup("User not found");
        } else {
          this.form.reset();
          this.dialogRef.close();
          this.userService.userSignInEvent.emit(data[0].id);
          this.router.navigate(['/profile', data[0].id]);
        }
      });
    }
  }

  public openSignUpForm(): void {
    this.isSignIn = !this.isSignIn;
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, Validators.required],
      firstName: [null, Validators.required]
    });
    this.form.valueChanges
      .subscribe(() =>
        this.formBuilderService.onFormValueChanged(this.form, this.formErrorsSignUp, this.validationMessagesSignUp));
  }

  private openMessagePopup(message: string): void {
    this.dialog.open(PopupComponent, {
        width: '500px',
        data: message
      }
    );
  }
}