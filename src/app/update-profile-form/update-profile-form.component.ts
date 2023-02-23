import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/models/user";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilderService} from "../services/form-builder.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.scss']
})
export class UpdateProfileFormComponent implements OnInit {

  public form!: FormGroup;
  public user!: User;
  public genderList: string[] = ["Male", "Female"];

  public formErrors: any = {
    'email': '',
    'firstName': '',
    'age': ''
  };

  private validationMessages: any = {
    'email': {
      'required': 'Email is required',
      'pattern': 'Email is not valid'
    },
    'firstName': {
      'required': 'First Name is required'
    },
    'age': {
      'min': 'Age must be positive'
    }
  };

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private formBuilderService: FormBuilderService,
              private dialogRef: MatDialogRef<UpdateProfileFormComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) private data: User,
              private userService: UserService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.updateForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: null,
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: null,
      gender: null,
      age: [null, Validators.min(1)],
    });
    this.form.valueChanges
      .subscribe(() =>
        this.formBuilderService.onFormValueChanged(this.form, this.formErrors, this.validationMessages));
  }

  public onSubmit(): void {
    this.user = this.form.value;
    this.user.password = this.data.password;
    this.user.image = this.data.image;
    if (this.data && this.data.id) {
      this.userService.updateUser(this.user, this.data.id).subscribe(data => {
        if (data) {
          this.userService.userUpdateEvent.emit(this.data.id);
        }
      });
    }
    this.form.reset();
    this.dialogRef.close();
  }

  public updateForm(): void {
    if (this.data) {
      this.user = this.data;
      this.form.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phone: this.user.phone,
        gender: this.user.gender,
        age: this.user.age,
      });
    }
  }
}
