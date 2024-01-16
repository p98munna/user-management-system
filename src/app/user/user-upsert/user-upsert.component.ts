import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.scss']
})
export class UserUpsertComponent implements OnInit {
  userForm: FormGroup;
  public submittedUserForm: Boolean = false;
  public showAlreadyExistUser: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    });
  }
  ngOnInit(): void {

    const userId = this.route.snapshot.queryParams['id'];
    if (userId) {
      // Getting Exiting user Value and set on Add user Form
      const user = this.userService.getUserById(userId);
      if (user) {
        this.userForm.patchValue(user);
      }
    }
  }
  //Return form Control
  get userFormControl() {
    return this.userForm.controls
  }

  // Get User Form Value
  submitUserForm() {
    if (this.userForm.invalid) {
      this.submittedUserForm = true;
      return
    }
    const user = this.userForm.value;
    if (user.id) {
      // Editing existing user
      this.userService.updateUser(user);
    } else {
      // Adding new user
      if (this.userService.checkUserExists(user.email)) {
        this.showAlreadyExistUser = true
        return;
      }
      this.userService.addUser(user);
      sessionStorage.setItem('userAddedStatus','yes')}

    // Notify User-List component to refresh
    this.dataService.setUser(null);

    // Redirect to user list
    this.router.navigate(['/user/user-list']);
  }


}
