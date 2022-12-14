import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICell } from "../../types";
import {
  DeleteCellPayload,
  InsertCellAfterPayload,
  MoveCellPayload,
  UpdateCellPayload,
} from "../payload-types";
import { v4 as uuidv4 } from "uuid";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: ICell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

export const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    initNotebook(state, action: PayloadAction<void>) {
      if (state.order.length > 0) {
        return;
      }
      const cell: ICell = {
        content: "",
        id: uuidv4(),
        type: "text",
      };
      state.data[cell.id] = cell;
      state.order.push(cell.id);
    },
    updateCell(state, action: PayloadAction<UpdateCellPayload>) {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell(state, action: PayloadAction<DeleteCellPayload>) {
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
    },
    moveCell(state, action: PayloadAction<MoveCellPayload>) {
      const currentIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );
      const targetIndex =
        action.payload.direction === "up" ? currentIndex - 1 : currentIndex + 1;

      // cell is at top or bottom
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[currentIndex] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },

    insertCellAfter(state, action: PayloadAction<InsertCellAfterPayload>) {
      const cell: ICell = {
        content: "",
        type: action.payload.type,
        id: uuidv4(),
      };
      state.data[cell.id] = cell;

      const indexOfTargetCell = state.order.findIndex(
        (id) => id === action.payload.id
      );

      // insert at top / 0th index
      if (indexOfTargetCell < 0) {
        state.order.unshift(cell.id);
        return;
      }

      state.order.splice(indexOfTargetCell + 1, 0, cell.id);
    },
  },
});

export const cellActions = {
  ...cellSlice.actions,
};
