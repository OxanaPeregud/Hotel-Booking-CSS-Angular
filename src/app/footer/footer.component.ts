import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilderService} from "../services/form-builder.service";
import {PopupComponent} from "../popup/popup.component";
import {UserService} from "../services/user.service";
import {Feedback} from "../shared/models/feedback";
import {User} from "../shared/models/user";
import {FeedbackService} from "../services/feedback.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public form!: FormGroup;

  public formErrors: any = {
    'name': '',
    'email': '',
    'feedback': ''
  };

  private validationMessages: any = {
    'name': {
      'required': 'Name is required'
    },
    'email': {
      'required': 'Email is required',
      'pattern': 'Email is not valid'
    },
    'feedback': {
      'required': 'Feedback is required',
      'maxlength': 'Feedback must be less than 400 symbols',
    }
  };

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private formBuilderService: FormBuilderService,
              private userService: UserService,
              private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      feedback: [null, [Validators.required, Validators.maxLength(400)]],
    });
    this.form.valueChanges
      .subscribe(() =>
        this.formBuilderService.onFormValueChanged(this.form, this.formErrors, this.validationMessages));
  }

  public onSubmit(): void {
    const feedbackData = this.form.value;
    const feedBack: Feedback = new Feedback();
    if (feedbackData.email) {
      this.userService.checkIfEmailExists(feedbackData.email).subscribe(data => {
        if (data.length != 0) {
          feedBack.userId = data[0].id;
          feedBack.text = feedbackData.feedback;
          this.feedbackService.saveFeedback(feedBack).subscribe(data => {
            if (data) {
              this.openMessagePopup('Thank you for your feedback!');
              this.feedbackService.reviewAddEvent.emit();
            }
          });
        } else {
          const user: User = new User();
          user.email = feedbackData.email;
          user.firstName = feedbackData.name;
          user.password = "1111";
          this.userService.saveUser(user).subscribe(data => {
            if (data) {
              feedBack.userId = data.id;
              feedBack.text = feedbackData.feedback;
              this.feedbackService.saveFeedback(feedBack).subscribe(data => {
                if (data) {
                  this.openMessagePopup('Thank you for your feedback!');
                  this.feedbackService.reviewAddEvent.emit();
                }
              });
            }
          });
        }
      });
    }
  }

  public openMessagePopup(message: string): void {
    this.dialog.open(PopupComponent, {
        data: message
      }
    );
    this.form.reset();
  }
}
