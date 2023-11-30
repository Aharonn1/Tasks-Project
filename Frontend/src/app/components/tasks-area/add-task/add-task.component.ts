import { Component } from '@angular/core';
import { Router } from '@angular/router';
import kindTask from 'src/app/models/kindTask.model';
import TaskModel from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import notify from 'src/app/utils/notify';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  kindTask: kindTask[];
  task = new TaskModel();

  constructor(private tasksService: TasksService, private router: Router) { }

  async ngOnInit() {
    this.kindTask = await this.tasksService.getAllKindTasks();
  }

  async send() {
    await this.tasksService.addTask(this.task)
    notify.success("task has been successful")
    this.router.navigateByUrl("/tasks")
  }
}