import { Injectable } from '@angular/core';
import { User } from '../models/user-models';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userData = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userData.asObservable();

  constructor() { }

  setUser(user: User | null) {
    this.userData.next(user);
  }
}
