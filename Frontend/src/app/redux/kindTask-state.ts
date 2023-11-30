import { createStore } from "redux";
import kindTask from "../models/kindTask.model";

export class kindTaskState {
    kindTask: kindTask[] = [];
}

export enum kindTaskActionType {
    FetchTasks = "FetchKindTasks",
}

export interface kindTasksAction {
    type: kindTaskActionType;
    payload: any
}

export function kindTaskReducer(currentState = new kindTaskState(), action: kindTasksAction): kindTaskState {
    const newState = { ...currentState };

    switch (action.type) {
        case kindTaskActionType.FetchTasks:
            newState.kindTask = action.payload;
            break;
    }

    return newState;
}

export const kindTasksStore = createStore(kindTaskReducer)