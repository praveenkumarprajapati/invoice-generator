"use client";

import { createSlice } from "@reduxjs/toolkit";
import { AlertProps } from "../components/Alert";
type Notification = AlertProps & { visible: boolean };
const initialState: Notification = {
  message: "",
  type: "info",
  duration: 5000,
  visible: false,
};

const notificationReducer = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    showNotification(state, action) {
      state = {
        ...state,
        ...action.payload,
        visible: true,
      };
      setTimeout(() => {
        state = {
          ...state,
          visible: false,
        };
        return state;
      }, state.duration);
      return state;
    },
    removeNotification(state) {
      state = initialState;
      return state;
    },
  },
});

export const { showNotification, removeNotification } =
  notificationReducer.actions;
export const notificationSelector = (state: { notification: Notification }) =>
  state.notification;
export default notificationReducer.reducer;
