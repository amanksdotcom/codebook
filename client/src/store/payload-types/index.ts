import { CellTypes } from "../../types";

export interface BundleStartPayload {
  cellId: string;
}

export interface BundleCompletePayload {
  cellId: string;
  bundle: {
    code: string;
    err: string;
  };
}

export interface UpdateCellPayload {
  id: string;
  content: string;
}

export type DirectionTypes = "up" | "down";

export interface MoveCellPayload {
  id: string;
  direction: DirectionTypes;
}

export type DeleteCellPayload = string;

export interface InsertCellAfterPayload {
  id: string | null;
  type: CellTypes;
}

export interface CreateBundlePayload {
  cellId: string;
  input: string;
}
