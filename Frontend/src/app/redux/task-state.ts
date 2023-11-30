import { createStore } from "redux";
import TaskModel from "../models/task.model";

export class TaskState {
    tasks: TaskModel[] = [];
}

export enum TaskActionType {
    FetchTasks = "FetchTasks",
    AddTask = "AddTask",
    DeleteTask = "DeleteTask"
}

export interface TasksAction {
    type: TaskActionType;
    payload: any
}

export function taskReducer(currentState = new TaskState(), action: TasksAction): TaskState {
    const newState = { ...currentState };

    switch (action.type) {
        case TaskActionType.FetchTasks:
            newState.tasks = action.payload;
            break;

        case TaskActionType.AddTask:
            if (newState.tasks.length > 0) {
                newState.tasks.push(action.payload)
            }
            break;
        case TaskActionType.DeleteTask:
            const indexToDelete = newState.tasks.findIndex(t => t.taskId === action.payload)
            if (indexToDelete >= 0) {
                newState.tasks.splice(indexToDelete, 1)
            }
            break;
    }
    return newState;
}

export const tasksStore = createStore(taskReducer)