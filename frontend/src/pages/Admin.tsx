import { useShows } from "../context/ShowsContext";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { isAdmin } = useAuth();
  const { shows, createShow, refreshShows } = useShows();
  const [form, setForm] = useState({ name: "", start_time: "", total_seats: 10 });
  const [loading, setLoading] = useState(false);
  if (!isAdmin) return <div>Please login as admin to access this page.</div>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createShow(form);
      setForm({ name: "", start_time: "", total_seats: 10 });
      await refreshShows();
      alert("Show created");
    } catch (err: any) {
      alert(err?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <form onSubmit={submit} className="space-y-2 mb-6 bg-white p-4 border rounded">
        <div>
          <label className="block text-sm">Name</label>
          <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full p-2 border rounded" required/>
        </div>
        <div>
          <label className="block text-sm">Start time (ISO)</label>
          <input value={form.start_time} onChange={(e)=>setForm({...form,start_time:e.target.value})} className="w-full p-2 border rounded" placeholder="2025-12-20T18:00:00Z" required/>
        </div>
        <div>
          <label className="block text-sm">Total seats</label>
          <input type="number" value={form.total_seats} onChange={(e)=>setForm({...form,total_seats: Number(e.target.value)})} className="w-full p-2 border rounded" min={1} required/>
        </div>
        <div>
          <button disabled={loading} className="px-3 py-1 bg-green-600 text-white rounded">{loading ? "Creating..." : "Create Show"}</button>
        </div>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2">All shows</h2>
        <div className="space-y-2">
          {shows.map(s => (
            <div key={s.id} className="p-3 bg-white border rounded">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-sm text-slate-600">{new Date(s.start_time).toLocaleString()}</div>
                </div>
                <div>Seats: {s.booked_seats}/{s.total_seats}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
