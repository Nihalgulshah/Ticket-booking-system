export type Show = {
  id: number;
  name: string;
  start_time: string;
  total_seats: number;
  booked_seats: number;
};

export type Booking = {
  id: number;
  show_id: number;
  seats: number;
  status: "PENDING" | "CONFIRMED" | "FAILED";
  created_at?: string;
};
