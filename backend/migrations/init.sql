CREATE TABLE IF NOT EXISTS shows (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  total_seats INT NOT NULL,
  booked_seats INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
    CREATE TYPE booking_status AS ENUM ('PENDING','CONFIRMED','FAILED');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  show_id INT REFERENCES shows(id) ON DELETE CASCADE,
  seats INT NOT NULL,
  status booking_status DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT now()
);

