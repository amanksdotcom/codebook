import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BundleStartPayload,
  BundleCompletePayload,
  CreateBundlePayload,
} from "../payload-types";
import bundle from "../../services/bundler";
import { AppDispatch } from "../store";

interface BundleState {
  [key: string]: { loading: boolean; code: string; err: string } | undefined;
}

const initialState: BundleState = {};

interface BundleThunkAPI {
  dispatch: AppDispatch;
  state: BundleState;
}

const createBundle = createAsyncThunk<
  BundleState,
  CreateBundlePayload,
  BundleThunkAPI
>("bundle/create", async ({ cellId, input }, { dispatch, getState }) => {
  dispatch(bundleActions.bundleStart({ cellId }));
  const result = await bundle(input);
  dispatch(bundleActions.bundleComplete({ cellId, bundle: result }));
  return getState();
});

export const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {
    bundleStart(state, action: PayloadAction<BundleStartPayload>) {
      state[action.payload.cellId] = {
        loading: true,
        code: "",
        err: "",
      };
    },
    bundleComplete(state, { payload }: PayloadAction<BundleCompletePayload>) {
      state[payload.cellId] = {
        loading: false,
        code: payload.bundle.code,
        err: payload.bundle.err,
      };
    },
  },
});

export const bundleActions = {
  ...bundleSlice.actions,
};
