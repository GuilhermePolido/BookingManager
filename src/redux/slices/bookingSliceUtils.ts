import { BookingModel } from "@models/BookingsModel";
import { BookingStoreModel } from "./bookingSlice";

export function toStore(data: BookingModel): BookingStoreModel {
  const storeData: BookingStoreModel = {
    ...data,
    accommodation: {
      ...data.accommodation,
      endDate:
        data.accommodation.endDate instanceof Date
          ? data.accommodation.endDate.toISOString()
          : data.accommodation.endDate,
      startDate:
        data.accommodation.startDate instanceof Date
          ? data.accommodation.startDate.toISOString()
          : data.accommodation.startDate,
    },
  };

  return storeData;
}

export function toEntity(data: BookingStoreModel): BookingModel {
  const storeData: BookingModel = {
    ...data,
    accommodation: {
      ...data.accommodation,
      endDate: new Date(data.accommodation.endDate),
      startDate: new Date(data.accommodation.startDate),
    },
  };

  return storeData;
}
