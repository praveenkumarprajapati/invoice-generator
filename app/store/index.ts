import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "../invoices/invoiceSlice";
import myInfoReducer from "../myinfoSlice";
import notificationReducer from "../slices/notificationSlice";

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
    myInfo: myInfoReducer,
    notification: notificationReducer,
  },
});
export default store;
