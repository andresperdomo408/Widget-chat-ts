import { createSlice } from "@reduxjs/toolkit";

export const messageAutomaticSlice = createSlice({
  name: "messageAutomaticState",
  initialState: {
    welcome: false,
  },
  reducers: {
    initial: (state) => {
      state.welcome = true;
    },
    clearChatMessage: (state) => {
      state.welcome = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initial, clearChatMessage } = messageAutomaticSlice.actions;
