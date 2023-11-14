import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasklistComponent } from './tasklist/tasklist.component';
import { AuthComponent } from './auth/auth.component';
import { KanbanComponent } from './kanban/kanban.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'taskList', component: TasklistComponent, canActivate: [AuthGuard] },
  { path: 'kanban', component: KanbanComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
