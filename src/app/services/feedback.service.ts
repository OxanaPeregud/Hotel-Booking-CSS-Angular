import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {baseURL} from "../shared/baseurl";
import {Feedback} from "../shared/models/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private feedbackLink: string = baseURL + "feedback";
  private headers = {'content-type': 'application/json'};

  constructor(private http: HttpClient) {
  }

  public saveFeedback(feedback: Feedback): Observable<Feedback> {
    const body = JSON.stringify(feedback);
    return this.http.post(this.feedbackLink, body, {'headers': this.headers});
  }

  public getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.feedbackLink);
  }
}
