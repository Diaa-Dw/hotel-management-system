import React from "react";
import { useParams } from "react-router-dom";
import BookingDetail from "../features/bookings/BookingDetail";

export default function Booking() {
  return (
    <div>
      <BookingDetail />
    </div>
  );
}
