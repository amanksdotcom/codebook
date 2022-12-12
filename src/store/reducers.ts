import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import { bundleSlice, cellSlice } from "./slices";

const combinedReducers = combineReducers({
  bundles: bundleSlice.reducer,
  cells: cellSlice.reducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

// custom root reducer to clear the redux store once logout action is triggered
export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/logout") {
    state = {} as RootState;
  }
  return combinedReducers(state, action);
};
