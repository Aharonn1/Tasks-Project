import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../utils/app-config';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import TaskModel from '../models/task.model';
import { TaskActionType, tasksStore } from '../redux/task-state';
import kindTask from '../models/kindTask.model';
import { kindTaskActionType, kindTasksStore } from '../redux/kindTask-state';
import notify from '../utils/notify';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }
  tasks = new BehaviorSubject<any[]>([]);

  async getAllTasks(): Promise<TaskModel[]> {
    let tasks = tasksStore.getState().tasks;
    try {
      if (tasks.length === 0) {
        const observable = this.http.get<TaskModel[]>(appConfig.tasksUrl)
        tasks = await firstValueFrom(observable)
        tasksStore.dispatch({ type: TaskActionType.FetchTasks, payload: tasks })
      }
    } catch (err: any) {
      notify.error(err.message)
    }
    return tasks;
  }

  async getAllKindTasks(): Promise<kindTask[]> {
    let kindTask = kindTasksStore.getState().kindTask;
    try {
      if (kindTask.length === 0) {
        const observable = this.http.get<kindTask[]>(appConfig.kindTasksUrl)
        kindTask = await firstValueFrom(observable)
        kindTasksStore.dispatch({ type: kindTaskActionType.FetchTasks, payload: kindTask })
      }
    } catch (err: any) {
      notify.error(err.message)
    }
    return kindTask;
  }

  async getTaskByKindTask(kindTaskId: number): Promise<TaskModel[]> {
    let kindTask = tasksStore.getState().tasks
    let task = kindTask.find(t => t.kindTaskId === kindTaskId)
    if (!task) {
      const observable = this.http.get<TaskModel[]>(appConfig.taskByTaskUrl + kindTaskId);
      kindTask = await firstValueFrom(observable)
      console.log(kindTask)
    }
    return kindTask;
  }

  async addTask(task: TaskModel): Promise<void> {
    try {
      const formData = new FormData();
      formData.append("kindTaskId", task.kindTaskId.toString())
      formData.append("name", task.name)
      formData.append("description", task.description)
      formData.append("startDate", task.startDate)
      formData.append("endDate", task.endDate)
      const observable = this.http.post<TaskModel>(appConfig.tasksUrl, formData);
      const addedTask = await firstValueFrom(observable);
      tasksStore.dispatch({ type: TaskActionType.AddTask, payload: addedTask })
    } catch (err: any) {
      notify.error(err.message)
    }
  }

  async deleteTask(taskId: number): Promise<void> {
    try {
      const observable = await this.http.delete(appConfig.tasksUrl + taskId);
      await firstValueFrom(observable)
      tasksStore.dispatch({ type: TaskActionType.DeleteTask, payload: taskId })
    } catch (err: any) {
      notify.error(err.message)
    }
  }

  async updateTaskFinished(task: TaskModel) {
    try {
      const observable = await this.http.put<TaskModel>(appConfig.tasksUrl + task.taskId, task);
      await firstValueFrom(observable)
      const tasks = this.tasks.getValue();
      const index = tasks.findIndex(item => (item.taskId == task.taskId));
      tasks[index].isFinish = task.isFinish;
      this.tasks.next(tasks);
    } catch (err: any) {
      notify.error(err.message)
    }
  }

  async updateTaskArchived(task: TaskModel) {
    try {
      const observable = await this.http.put<TaskModel>(appConfig.tasksUrl + task.taskId + "/archived", task);
      await firstValueFrom(observable)
      const tasks = this.tasks.getValue();
      const index = tasks.findIndex(item => (item.taskId == task.taskId));
      tasks[index].isArchived = task.isArchived;
      this.tasks.next(tasks);
    } catch (err: any) {
      notify.error(err.message)
    }
  }

  isMoreThanWeekFromNow(task: TaskModel) {

    const currentDate = new Date();

    const taskStartDateParts: any = task.startDate.split('-');

    const validDate = new Date(taskStartDateParts[2], taskStartDateParts[1] - 1, taskStartDateParts[0]);

    const currentTime = currentDate.getTime();

    const week = (7 * 24 * 60 * 60 * 1000);

    const calcDayOver = currentTime - validDate.getTime()

    return calcDayOver > week;
  }
}