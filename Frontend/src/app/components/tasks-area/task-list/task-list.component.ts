import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import TaskModel from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import notify from 'src/app/utils/notify';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  subscribe!: Subscription;
  tasks: TaskModel[];
  text: string;
  isArchivedTasksNeeded: boolean = false;
  filterUnArchivedTask() {
    this.tasks = this.tasks.filter((task: TaskModel) => (!task.isArchived && !this.tasksService.isMoreThanWeekFromNow(task)))
  }

  constructor(private tasksService: TasksService) { }

  async ngOnInit() {

    this.tasks = await this.tasksService.getAllTasks();
    this.tasksService.tasks.next(this.tasks);

    this.subscribe = this.tasksService.tasks.subscribe((data) => {
      this.tasks = data;

      if (!this.isArchivedTasksNeeded) {
        this.filterUnArchivedTask();
      }
    })
  }

  // search = () => {
  //   const findTasks =
  //     this.tasks && this.tasks?.length > 0 ? this.tasks?.filter((s) => s?.name === this.text) : undefined
  //   this.tasksService.tasks.next(findTasks);
  // }

  // search(){
  //   const searchResults = this.tasks.filter(item => item.name.toLowerCase());
  //   const firstMatch = this.tasks.find(item => item.taskId === );

  // }

  

  toggleArchivedTasks() {
    this.isArchivedTasksNeeded = !this.isArchivedTasksNeeded;
    const value = this.tasksService.tasks.getValue()
    this.tasksService.tasks.next(value);
  }

  async updateTask(task: TaskModel) {
    await this.tasksService.updateTaskFinished(task)
    notify.success("task has been update")
  }

  async updateTaskArchived(task: TaskModel) {
    await this.tasksService.updateTaskArchived(task)
    notify.success("task has been archived")
  }

  async deleteTask(id: number) {
    if (!window.confirm("Are you sure ?")) return;
    await this.tasksService.deleteTask(id)
    notify.success("task has been deleted")
  }

  ngOnDestroy(): void { }
}