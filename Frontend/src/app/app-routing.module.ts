import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { TaskListComponent } from './components/tasks-area/task-list/task-list.component';
import { AddTaskComponent } from './components/tasks-area/add-task/add-task.component';
import { ArchivedTasksComponent } from './components/tasks-area/archived-tasks/archived-tasks.component';

const routes: Routes = [
  {path: "tasks", component: TaskListComponent},
  {path: "tasks/archived", component: ArchivedTasksComponent},
  {path: "tasks/new", component:AddTaskComponent},
  {path:"**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
