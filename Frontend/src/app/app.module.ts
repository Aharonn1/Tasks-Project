import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import { AddTaskComponent } from './components/tasks-area/add-task/add-task.component';
import { TaskCardComponent } from './components/tasks-area/task-card/task-card.component';
import { TaskListComponent } from './components/tasks-area/task-list/task-list.component';
import { ArchivedTasksComponent } from './components/tasks-area/archived-tasks/archived-tasks.component';
import { KindTaskListComponent } from './components/tasks-area/kind-task-list/kind-task-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PageNotFoundComponent,
    AddTaskComponent,
    TaskCardComponent,
    TaskListComponent,
    ArchivedTasksComponent,
    KindTaskListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [LayoutComponent]
 
})
export class AppModule { }
