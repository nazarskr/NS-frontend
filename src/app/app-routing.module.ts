import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth/auth.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { TaskShareComponent } from './task/task-share/task-share.component';
import { UserGuard } from './auth/auth/auth.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users/:name', component: TaskListComponent, canActivate: [UserGuard]},
  {path: 'create', component: TaskCreateComponent, canActivate: [UserGuard]},
  {path: 'edit/:taskId', component: TaskCreateComponent},
  {path: 'auth/:param', component: AuthComponent},
  {path: 'share/:task', component: TaskShareComponent, canActivate: [UserGuard]},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [UserGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
