import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TasksComponent } from './tasklist/tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveTasksComponent } from './tasklist/tasks/reactive-tasks/reactive-tasks.component';
import { AuthComponent } from './auth/auth.component';
import { KanbanComponent } from './kanban/kanban.component';
import { NotificationComponent } from './notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TasklistComponent,
    TasksComponent,
    ReactiveTasksComponent,
    AuthComponent,
    KanbanComponent,
    NotificationComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
