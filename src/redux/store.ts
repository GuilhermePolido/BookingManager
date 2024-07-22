import { configureStore } from "@reduxjs/toolkit";
import { bookingsSlice, BookingsState } from "@redux/slices/bookingSlice";

export type StoreStates = {
  bookings: BookingsState
}

export const store = configureStore({
  reducer: {
    bookings: bookingsSlice.reducer,
  },
});

