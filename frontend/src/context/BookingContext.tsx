import React, { createContext, useContext, useState } from "react";
import api from "../api/api";
import type { Booking } from "../types";

type BookingContextType = {
  createBooking: (showId: number, seats: number) => Promise<Booking>;
  bookings: Booking[];
  fetchBookings: () => Promise<void>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const createBooking = async (showId: number, seats: number) => {
    const res = await api.post<{ status: string; bookingId: number }>("/bookings", { showId, seats });
    await fetchBookings();
    return { id: res.data.bookingId, show_id: showId, seats, status: res.data.status as any } as Booking;
  };

  const fetchBookings = async () => {
    const res = await api.get<Booking[]>("/bookings");
    setBookings(res.data);
  };

  return (
    <BookingContext.Provider value={{ createBooking, bookings, fetchBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
};
