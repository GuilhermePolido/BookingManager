import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bookings from "../pages/booking/list/Bookings";
import BookingForm from "../pages/booking/form/BookingForm";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bookings />} />
        <Route path="/bookings/new" element={<BookingForm />} />
        <Route path="/bookings/:id" element={<BookingForm />} />
      </Routes>
    </BrowserRouter>
  );
}
