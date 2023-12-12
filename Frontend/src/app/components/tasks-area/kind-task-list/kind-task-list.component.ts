import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import kindTask from 'src/app/models/kindTask.model';
import TaskModel from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import notify from 'src/app/utils/notify';

@Component({
  selector: 'app-kind-task-list',
  templateUrl: './kind-task-list.component.html',
  styleUrls: ['./kind-task-list.component.css']
})
export class KindTaskListComponent {
  task = new TaskModel();
  kindTask: kindTask[];
  subscribe!: Subscription;
  tasks: TaskModel[];
  filteredTasksCount: number;


  constructor(private tasksService: TasksService) { }

  filterArchivedTask() {
    this.tasks = this.tasks.filter((task: TaskModel) => (task.isArchived || this.tasksService.isMoreThanWeekFromNow(task)))
  }

  async ngOnInit() {
    this.kindTask = await this.tasksService.getAllKindTasks();
    this.tasksService.tasks.next(this.kindTask);

    this.subscribe = this.tasksService.tasks.subscribe((data) => {
      this.tasks = data;
    })
  }

  amountTasks() {
    this.filteredTasksCount = this.tasks.filter(item => item.taskCount === 1).length;
  }

  amountTasksFinished() {
    this.filteredTasksCount = this.tasks.filter(item => item.isFinish === 1).length;
  }

  async onChange(task: number) {
    const value = await this.tasksService.getTaskByKindTask(task)
    this.tasksService.tasks.next(value);
  }
}