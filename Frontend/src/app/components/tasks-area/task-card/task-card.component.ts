import { Component, EventEmitter, Input, Output } from '@angular/core';
import TaskModel from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  @Input() task: TaskModel;
  @Output() deleteMe = new EventEmitter<number>();
  @Output() updateMe = new EventEmitter<TaskModel>();
  @Output() archivedMe = new EventEmitter<TaskModel>();

  async deleteTask() {
    this.deleteMe.emit(this.task.taskId)
  }

  async updateTask() {
    this.task.isFinish = this.task.isFinish ? 0 : 1;
    this.updateMe.emit(this.task);
  }

  async archivedTask() {
    this.task.isArchived = this.task.isArchived == 1 ? 0 : 1;
    this.archivedMe.emit(this.task);
  }
}