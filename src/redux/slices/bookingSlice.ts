import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface BookingStoreModel {
  id?: string;
  typeRoom: string;
  room: string;
  name: string;
  email: string;
  phone: string;
  documentNumber: string;
  status?: "PREBOOKING" | "BOOKING" | "CHECKIN" | "CHECKOUT" | "CANCELED";
  accommodation: {
      endDate: string;
      startDate: string;
      key: string,
  }
}

export type BookingsState = {
  bookings: BookingStoreModel[];
};

const initialState: BookingsState = {
  bookings: JSON.parse(localStorage.getItem("bookings") || "[]"),
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    createNewBooking: (state, action: PayloadAction<BookingStoreModel>) => {
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
    updateBooking: (state, action: PayloadAction<BookingStoreModel>) => {
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
