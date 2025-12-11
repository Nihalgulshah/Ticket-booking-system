import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isAdmin, loginAsAdmin, logout } = useAuth();
  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold">TicketApp</Link>
          <Link to="/" className="text-sm text-slate-600">Shows</Link>
          <Link to="/admin" className="text-sm text-slate-600">Admin</Link>
        </div>
        <div>
          {isAdmin ? (
            <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
          ) : (
            <button onClick={loginAsAdmin} className="px-3 py-1 border rounded">Login as Admin</button>
          )}
        </div>
      </div>
    </header>
  );
}
