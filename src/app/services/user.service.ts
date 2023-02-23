import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {baseURL} from "../shared/baseurl";
import {User} from "../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersLink: string = baseURL + "users";
  private headers = {'content-type': 'application/json'};
  @Output() userUpdateEvent = new EventEmitter<any>();
  @Output() userSignInEvent = new EventEmitter<any>();
  @Output() userSignOutEvent = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  }

  public getUser(user: User): Observable<User[]> {
    return this.http.get<User[]>(this.usersLink + "?email=" + user.email + "&password=" + user.password);
  }

  public getUserById(userId: number): Observable<User[]> {
    return this.http.get<User[]>(this.usersLink + "?id=" + userId);
  }

  public checkIfEmailExists(user: User): Observable<User[]> {
    return this.http.get<User[]>(this.usersLink + "?email=" + user.email);
  }

  public saveUser(user: User): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.post(this.usersLink, body, {'headers': this.headers});
  }

  public updateUser(user: User, userId: number): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.put(this.usersLink + "/" + userId, body, {'headers': this.headers});
  }
}
