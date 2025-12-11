import { Link } from "react-router-dom";
import { useShows } from "../context/ShowsContext";

export default function Home() {
  const { shows, refreshShows } = useShows();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Available Shows</h1>
        <button onClick={refreshShows} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #e5e7eb" }}>Refresh</button>
      </div>

      {shows.length === 0 ? (
        <p>No shows available.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {shows.map((s) => (
            <div key={s.id} style={{ padding: 12, background: "#fff", border: "1px solid #e6edf3", borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>{new Date(s.start_time).toLocaleString()}</div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>Available: {s.total_seats - s.booked_seats}</div>
                </div>
                <div>
                  <Link to={`/booking/${s.id}`} style={{ padding: "6px 10px", background: "#2563eb", color: "#fff", borderRadius: 6, textDecoration: "none" }}>
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
