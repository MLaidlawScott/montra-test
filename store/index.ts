import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { profileSlice } from "./profileSlice";

export const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
