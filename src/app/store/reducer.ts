import { Photo } from '../image.service';
import { ActionsUnion, ActionTypes } from './actions';

export interface AppState {
    items: Array<Photo>;
    page: number;
    limit: number;
    query?: string;
}

export const initialState: AppState = {
    items: [],
    page: 1,
    limit: 30,
    query: ''
};

export function GalleryReducer(state = initialState, action: ActionsUnion): AppState {
    switch (action.type) {
        case ActionTypes.LoadSuccess:
            return {
                ...state,
                items: [...state.items, ...action.payload],
                query: action.query
            };
        case ActionTypes.ClearItems:
            return {
                ...state,
                items: []
            };

        default:
            return state;
    }
}
