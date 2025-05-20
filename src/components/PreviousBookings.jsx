// AdminBookingFhTable.jsx
import React, { useState, useEffect } from "react";

export default function AdminBookingFhTable() {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const API_BASE = isLocal
    ? "http://127.0.0.1:8000"
    : "https://api.kokomoyachtclub.vip";

  // Columns we want to render as a tiny “view” link
  const actionCols = new Set(["dashboard_url", "modify_view"]);
  const columnLabels = { dashboard_url: "Action", modify_view: "Action" };

  // State
  const [usernamesList, setUsernamesList] = useState([]);
  const [username, setUsername] = useState("");
  const [rows, setRows] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // 1) Fetch all usernames on mount
  useEffect(() => {
    const fetchUsernames = async () => {
      setLoadingUsers(true);
      try {
        const res = await fetch(`${API_BASE}/usernames/usernames/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { usernames } = await res.json();
        setUsernamesList(usernames);
      } catch {
        setError("Unable to load users");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsernames();
  }, [API_BASE]);

  // 2) Fetch bookings for selected user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    if (!username) {
      setError("Please select a user");
      return;
    }
    setError("");
    setLoadingBookings(true);
    setRows([]);
    try {
      const res = await fetch(
        `${API_BASE}/booking/admin/?username=${encodeURIComponent(username)}`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRows(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Derive columns from first row
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="space-y-6">
      {/* ─── User Selection Form ────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center md:w-1/2 gap-4 p-6 bg-white rounded-2xl shadow-lg"
      >
        <h2 className="text-lg font-semibold w-full">
          View User Bookings
        </h2>
        <div className="flex space-x-4 justify-evenly w-full">
          <select
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setHasSearched(false); // reset if they pick a different user
              setError("");
              setRows([]);
            }}
            disabled={loadingUsers}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-midnightblue"
          >
            <option value="">— Select member by username —</option>
            {usernamesList.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loadingBookings || loadingUsers}
            className="px-4 py-2 bg-midnightblue text-white rounded-lg hover:bg-midnightblue/90"
          >
            {loadingBookings ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>

      {/* ─── Messages ───────────────────────────────────────────────── */}
      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      {/* ─── Bookings Table ─────────────────────────────────────────── */}
      {!loadingBookings && rows.length > 0 && (
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 text-left text-sm font-semibold text-midnightblue whitespace-nowrap"
                  >
                    {columnLabels[col] ||
                      col
                        .split("_")
                        .map((w) => w[0].toUpperCase() + w.slice(1))
                        .join(" ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="px-4 py-2 text-sm whitespace-nowrap"
                    >
                      {actionCols.has(col) ? (
                        <a
                          href={row[col]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          view
                        </a>
                      ) : row[col] == null ? (
                        "—"
                      ) : (
                        String(row[col])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── No Results ──────────────────────────────────────────────── */}
      {hasSearched && !loadingBookings && !error && rows.length === 0 && (
        <p className="text-center text-gray-600">
          No bookings found for <strong>{username}</strong>.
        </p>
      )}
    </div>
  );
}
