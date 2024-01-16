import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user-models';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usersList: User[] = [];

  constructor(
    private userService: UserService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    //storing local data
    this.userService.usersData.subscribe(users => {
      this.usersList = users;
    });
    // checking local data not available then store dumy api data
    if (this.usersList.length == 0) {
      this.userService.getUsers().subscribe(users => {
        this.usersList = users;
      });
    }

  }

  onEdit(user: User) {
    // Send user details to User-Upsert component using DataService
    this.dataService.setUser(user);
  }

  onDelete(userId: any) {
    // Remove user from the list
    this.userService.deleteUser(userId);

    // Notify User-Upsert component to refresh if needed
    this.dataService.setUser(null);
  }
}
