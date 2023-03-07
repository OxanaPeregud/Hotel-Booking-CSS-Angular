import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";
import {FormBuilderService} from "../services/form-builder.service";

@Component({
  selector: 'app-news-subscribe',
  templateUrl: './news-subscribe.component.html',
  styleUrls: ['./news-subscribe.component.scss']
})
export class NewsSubscribeComponent implements OnInit {

  public form!: FormGroup;

  public formErrors: any = {
    'email': ''
  };

  private validationMessages: any = {
    'email': {
      'required': 'Email is required',
      'pattern': 'Email is not valid'
    }
  };

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private formBuilderService: FormBuilderService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
    this.form.valueChanges
      .subscribe(() =>
        this.formBuilderService.onFormValueChanged(this.form, this.formErrors, this.validationMessages));
  }

  public openMessagePopup(message: string): void {
    this.dialog.open(PopupComponent, {
        data: message
      }
    );
    this.form.reset();
  }
}
