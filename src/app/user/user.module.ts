import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    UserUpsertComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
