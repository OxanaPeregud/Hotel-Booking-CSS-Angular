import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilderService} from "../services/form-builder.service";
import {PopupComponent} from "../popup/popup.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public form!: FormGroup;

  public formErrors: any = {
    'name': '',
    'phone': ''
  };

  private validationMessages: any = {
    'name': {
      'required': 'Name is required'
    },
    'phone': {
      'required': 'Phone is required'
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
      name: [null, Validators.required],
      phone: [null, Validators.required],
      message: null
    });
    this.form.valueChanges
      .subscribe(() =>
        this.formBuilderService.onFormValueChanged(this.form, this.formErrors, this.validationMessages));
  }

  public openMessagePopup(message: string): void {
    this.dialog.open(PopupComponent, {
        width: '500px',
        data: message
      }
    );
    this.form.reset();
  }
}
