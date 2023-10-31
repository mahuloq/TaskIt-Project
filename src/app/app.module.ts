import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TasksComponent } from './tasklist/tasks/tasks.component';
import { TasksEditComponent } from './tasklist/tasks/tasks-edit/tasks-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveTasksComponent } from './tasklist/tasks/reactive-tasks/reactive-tasks.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TasklistComponent,
    TasksComponent,
    TasksEditComponent,
    ReactiveTasksComponent,
    LandingPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
