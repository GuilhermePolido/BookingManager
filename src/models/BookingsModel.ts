export type BookingModel = {
    id?: string;
    typeRoom: string;
    room: string;
    name: string;
    email: string;
    phone: string;
    documentNumber: string;
    status?: "PREBOOKING" | "BOOKING" | "CHECKIN" | "CHECKOUT" | "CANCELED";
    accommodation: {
        endDate: Date;
        startDate: Date;
        key: string,
    }
}