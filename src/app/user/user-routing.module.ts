import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/upsert', component: UserUpsertComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
