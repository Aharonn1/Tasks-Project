import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import TaskModel from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import notify from 'src/app/utils/notify';

@Component({
  selector: 'app-archived-tasks',
  templateUrl: './archived-tasks.component.html',
  styleUrls: ['./archived-tasks.component.css']
})
export class ArchivedTasksComponent implements OnInit, OnDestroy {

  tasks: TaskModel[];
  subscribe!: Subscription;

  constructor(private tasksService: TasksService) { }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
  filterArchivedTask() {
    this.tasks = this.tasks.filter((task: TaskModel) => (task.isArchived || this.tasksService.isMoreThanWeekFromNow(task)))
  }
  async ngOnInit() {
    this.subscribe = this.tasksService.tasks.subscribe((data) => {
      this.tasks = data;
      this.filterArchivedTask();
    })

    this.tasks = await this.tasksService.getAllTasks();
    this.tasksService.tasks.next(this.tasks);
  }

  async updateTaskArchived(task: TaskModel) {
    await this.tasksService.updateTaskArchived(task)
    notify.success("task has been archived")
  }
}