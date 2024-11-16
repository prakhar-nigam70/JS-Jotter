import {produce} from 'immer';
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState{
    loading: boolean;
    error:string | null;
    order: string[];
    data: {
        [key: string]: Cell
    }
}

const initialCellState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const reducer = produce((state: CellsState = initialCellState, action: Action): CellsState => {
    switch(action.type){
        case ActionType.SAVE_CELLS_ERROR:
            state.error = action.payload;
            return state;
        case ActionType.FETCH_CELLS:
            state.loading = true;
            state.error = null;
            return state;
        case ActionType.FETCH_CELLS_COMPLETE:
            state.order = action.payload.map(cell => cell.id);
            state.data = action.payload.reduce((acc, cell) => {
                acc[cell.id] = cell;
                return acc;
            }, {} as CellsState['data']);
            return state;
        case ActionType.FETCH_CELLS_ERROR:
            state.loading = false;
            state.error = action.payload;
            return state;
        case ActionType.UPDATE_CELL:
            const {id, content} = action.payload;
            state.data[id].content = content;
            return state;
        case ActionType.DELETE_CELL:
            delete state.data[action.payload];
            state.order = state.order.filter(id => id !== action.payload);
            return state;
        case ActionType.MOVE_CELL:
            const {direction} = action.payload;
            const index = state.order.findIndex(id => id === action.payload.id);
            let targetIndex = direction === 'up' ? index - 1 : index + 1;

            //Check if the current index is first or last, don't update the index
            if(targetIndex < 0 || targetIndex > state.order.length - 1) return state;

            //swap the array values of order array
            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
            return state;
        case ActionType.INSERT_CELL_AFTER:
            const {type} = action.payload;

            const newCell: Cell = {
                content: '',
                type,
                id: generateRandomId()
            }

            const foundIndex = state.order.findIndex(id => id === action.payload.id);
            if(foundIndex < 0){
                //if foundIndex is -1, means that payload id is null, so to insert at first index;
                state.order.unshift(newCell.id);
            }else{
                //Else insert at next to the the foundIndex position;
                state.order.splice(foundIndex + 1, 0, newCell.id);
            }

            //update the data property as well;
            state.data[newCell.id] = newCell;
            return state;
        default:
            return state;
    }
}, initialCellState);

const generateRandomId = () => Math.random().toString(36).substring(2, 7);

export default reducer;