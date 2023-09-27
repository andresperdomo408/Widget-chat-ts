import { createSlice } from "@reduxjs/toolkit";

export const widgetSlice = createSlice({
  name: "widgetState",
  initialState: {
    _id: null,
    name: null,
    email: null,
    countryCode: null,
    phoneNumber: null,
    identificationCard: null,
    status: false,
  },
  reducers: {
    initial: (state, { payload }) => {
      state._id = payload._id;
      state.name = payload.name;
      state.email = payload.email;
      state.countryCode = payload.countryCode;
      state.phoneNumber = payload.phoneNumber;
      state.identificationCard = payload.identificationCard;
      state.status = true;
    },
    clearChat: (state) => {
      state._id = null;
      state.name = null;
      state.email = null;
      state.countryCode = null;
      state.phoneNumber = null;
      state.identificationCard = null;
      state.status = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initial, clearChat } = widgetSlice.actions;
