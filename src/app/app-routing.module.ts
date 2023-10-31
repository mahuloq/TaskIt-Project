import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { KanbanComponent } from './kanban/kanban.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'taskList', component: TasklistComponent },
  { path: 'kanban', component: KanbanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
