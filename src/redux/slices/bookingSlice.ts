import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { BookingModel } from "src/models/BookingsModel";
import { StoreStates } from "@redux/store";

export type BookingsState = {
  bookings: BookingModel[];
};

const initialState: BookingsState = {
  bookings: JSON.parse(localStorage.getItem("bookings") || "[]"),
};

const selectBookingsState = (state: StoreStates) => state.bookings;
export const stateBookingsSlice = createSelector(
  selectBookingsState,
  (bookings) => bookings
);

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    createNewBooking: (state, action: PayloadAction<BookingModel>) => {
      const newBooking = { id: uuidv4(), ...action.payload };
      state.bookings.push(newBooking);
      localStorage.setItem("bookings", JSON.stringify(state.bookings));
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("bookings", JSON.stringify(state.bookings));
    },
    updateBooking: (state, action: PayloadAction<BookingModel>) => {
      const index = state.bookings.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.bookings[index] = action.payload;
        localStorage.setItem("bookings", JSON.stringify(state.bookings));
      }
    },
  },
});
