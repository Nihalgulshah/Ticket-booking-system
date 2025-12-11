import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import SeatGrid from "../components/SeatGrid";
import { useBooking } from "../context/BookingContext";

type ShowDetail = {
  id: number;
  name: string;
  start_time: string;
  total_seats: number;
  booked_seats: number;
};

export default function Booking() {
  const { id } = useParams();
  const [show, setShow] = useState<ShowDetail | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { createBooking, fetchBookings } = useBooking();

  useEffect(() => {
    if (!id) return;
    api.get(`/shows/${id}`).then((r) => setShow(r.data)).catch(console.error);
  }, [id]);

  const confirmBooking = async () => {
    if (!show) return;
    if (selectedSeats.length === 0) {
      alert("Select seats first");
      return;
    }
    setLoading(true);
    try {
      await createBooking(show.id, selectedSeats.length);
      await fetchBookings();
      const res = await api.get(`/shows/${show.id}`);
      setShow(res.data);
      alert("Booking attempted. Check bookings list for status.");
      setSelectedSeats([]);
    } catch (err: any) {
      alert(err?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return <div>Loading show...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">{show.name}</h1>
      <div className="mb-2 text-sm text-slate-600">{new Date(show.start_time).toLocaleString()}</div>
      <div className="mb-4">Available: {show.total_seats - show.booked_seats}</div>

      <div className="mb-4">
        <SeatGrid totalSeats={show.total_seats} bookedSeats={show.booked_seats} onSelect={(s)=>setSelectedSeats(s)} maxSelectable={10}/>
      </div>

      <div className="flex items-center gap-3">
        <div>Selected: {selectedSeats.length}</div>
        <button onClick={confirmBooking} disabled={loading || selectedSeats.length === 0} className="px-3 py-1 bg-blue-600 text-white rounded">
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
