import { BookingModel } from "@models/BookingsModel";
import { isWithinInterval } from "date-fns";
import { Room } from "src/mock/MockRoom";

export function getOccupiedRooms(
  bookings: BookingModel[],
  startDate: Date,
  endDate: Date
): string[] {
  return bookings
    .filter((booking) => booking.status !== "CANCELED")
    .filter((booking) => {
      const bookingStart = booking.accommodation.startDate;
      const bookingEnd = booking.accommodation.endDate;
      return (
        isWithinInterval(bookingStart, { start: startDate, end: endDate }) ||
        isWithinInterval(bookingEnd, { start: startDate, end: endDate }) ||
        isWithinInterval(startDate, { start: bookingStart, end: bookingEnd }) ||
        isWithinInterval(endDate, { start: bookingStart, end: bookingEnd })
      );
    })
    .map((booking) => booking.room);
}

export function getFreeRooms(
  bookings: BookingModel[],
  startDate: Date,
  endDate: Date,
  rooms: Room[]
): Room[] {
  const occupiedRooms = getOccupiedRooms(bookings, startDate, endDate);

  return rooms.filter((room) => !occupiedRooms.includes(room.roomNumber));
}
