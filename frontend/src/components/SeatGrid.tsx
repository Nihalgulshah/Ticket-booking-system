
type Props = {
  totalSeats: number;
  bookedSeats: number;
  onSelect: (selected: number[]) => void;
  maxSelectable?: number;
};

export default function SeatGrid({ totalSeats, bookedSeats, onSelect, maxSelectable = 10 }: Props) {
  const seats = useMemo(() => Array.from({ length: totalSeats }, (_, i) => i + 1), [totalSeats]);
  const bookedSet = useMemo(() => new Set<number>(Array.from({ length: bookedSeats }, (_, i) => i + 1)), [bookedSeats]);
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (n: number) => {
    if (bookedSet.has(n)) return;
    if (selected.includes(n)) {
      const next = selected.filter((s) => s !== n);
      setSelected(next);
      onSelect(next);
      return;
    }
    if (selected.length >= maxSelectable) return;
    const next = [...selected, n];
    setSelected(next);
    onSelect(next);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(8, minmax(0,1fr))", gap: 8 }}>
      {seats.map((n) => {
        const isBooked = bookedSet.has(n);
        const isSelected = selected.includes(n);
        const style: React.CSSProperties = {
          padding: "8px 6px",
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          backgroundColor: isBooked ? "#fecaca" : isSelected ? "#bbf7d0" : "#ffffff",
          cursor: isBooked ? "not-allowed" : "pointer",
          textAlign: "center",
        };
        return (
          <button
            key={n}
            onClick={() => toggle(n)}
            style={style}
            disabled={isBooked}
            aria-pressed={isSelected}
            title={isBooked ? "Already booked" : `Seat ${n}`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
