import { Injectable } from '@angular/core';
import { User } from '../models/user-models';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  private users: User[] = [];
  private userData = new BehaviorSubject<User[]>(this.users);
  usersData = this.userData.asObservable();

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    user.id = this.generateUniqueId();
    this.users.push(user);
    this.userData.next([...this.users]);
  }

  updateUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = { ...user };
      this.userData.next([...this.users]);
    }
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(u => u.id !== userId);
    this.userData.next([...this.users]);
  }

  checkUserExists(email: string): boolean {
    return this.users.some(u => u.email === email);
  }
  getUserById(userId: number): User | undefined {
    return this.users.find(u => u.id == userId);
  }
  private generateUniqueId(): number {
    return Math.floor(Math.random() * 1000);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
}
