import {Component, OnInit} from '@angular/core';
import {FeedbackService} from "../services/feedback.service";
import {Feedback} from "../shared/models/feedback";
import {UserService} from "../services/user.service";
import {User} from "../shared/models/user";

@Component({
  selector: 'app-reviews-slider',
  templateUrl: './reviews-slider.component.html',
  styleUrls: ['./reviews-slider.component.scss']
})
export class ReviewsSliderComponent implements OnInit {

  public feedbacks: Feedback[] = [];
  public feedbacksIds: number[] = [];
  public previousFeedbackId!: number;
  public nextFeedbackId!: number;
  public currentFeedback: Feedback | undefined;
  public user!: User;

  constructor(private feedbackService: FeedbackService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  private getFeedbacks(): void {
    this.feedbacksIds = [];
    this.feedbackService.getFeedbacks().subscribe(data => {
      if (data) {
        this.feedbacks = data;
        if (this.feedbacks.length != 0) {
          this.feedbacks.forEach(item => {
            if (item.id != null) {
              this.feedbacksIds.push(item.id);
            }
          });
          const currentFeedback = this.feedbacks[0];
          this.getUser(currentFeedback?.userId, currentFeedback);
        }
      }
    });
  }

  private setPreviousAndNextFeedback(feedbackId: number | undefined): void {
    if (feedbackId) {
      const index: number = this.feedbacksIds.indexOf(feedbackId);
      this.previousFeedbackId = this.feedbacksIds[(this.feedbacksIds.length + index - 1) % this.feedbacksIds.length];
      this.nextFeedbackId = this.feedbacksIds[(this.feedbacksIds.length + index + 1) % this.feedbacksIds.length];
    }
  }

  public getNextFeedback(feedbackId: number | undefined): void {
    this.setPreviousAndNextFeedback(feedbackId);
    const currentFeedback = this.feedbacks.find(item => item.id == this.nextFeedbackId);
    this.getUser(currentFeedback?.userId, currentFeedback);
  }

  public getPreviousFeedback(feedbackId: number | undefined): void {
    this.setPreviousAndNextFeedback(feedbackId);
    const currentFeedback = this.feedbacks.find(item => item.id == this.previousFeedbackId);
    this.getUser(currentFeedback?.userId, currentFeedback);
  }

  public getUser(userId: number | undefined, currentFeedback: Feedback | undefined): void {
    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        if (data.length != 0) {
          this.user = data[0];
          this.currentFeedback = currentFeedback;
        }
      });
    }
  }
}
