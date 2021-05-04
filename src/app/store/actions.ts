import { Action } from '@ngrx/store';
import { Photo } from '../image.service';

export interface PexelsRequest {
    page: number;
    limit: number;
    query: string;
}
export enum ActionTypes {
    LoadItems = '[Image Gallery] Load items from server',
    LoadSuccess = '[Image Gallery] Load success',
    ClearItems = '[Image Gallery] Clear screen',
}

export class GetItems implements Action {
    readonly type = ActionTypes.LoadItems;
    constructor(public payload: PexelsRequest) { }
}

export class ClearItems implements Action {
    readonly type = ActionTypes.ClearItems;

    constructor() { }
}

export class LoadItems implements Action {
    readonly type = ActionTypes.LoadSuccess;

    constructor(public payload: Photo[], public query: string) { }
}

export type ActionsUnion = ClearItems | LoadItems | GetItems;
