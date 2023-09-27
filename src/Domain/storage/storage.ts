import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { widgetSlice } from "./widget/widgetSlice";
import { messageAutomaticSlice } from "./messageAutomatic/messageAutomaticSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  widgetState: widgetSlice.reducer,
  messageAutomaticState: messageAutomaticSlice.reducer,
});

const persistreducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistreducer,
  middleware: [thunk],
});
