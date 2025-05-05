// AdminBookingFhTable.jsx
import React, { useState, useEffect } from "react";

// determine API base URL
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
const API_BASE = isLocal
  ? "http://127.0.0.1:8000"
  : "https://api.kokomoyachtclub.vip";

export default function PreviousBookings() {
  const [rows, setRows]     = useState([]);
  const [loading, setLoad]  = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE}/booking/admin/`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRows(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoad(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading bookings…</p>;
  if (error)   return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!rows.length) return <p>No bookings found.</p>;

  // derive table columns from keys of the first row
  const columns = Object.keys(rows[0]);

  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left text-sm font-semibold text-midnightblue whitespace-nowrap"
              >
                {col
                  .split("_")
                  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
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
                  {row[col] === null
                    ? "—"
                    : // make URLs clickable
                      (col === "dashboard_url"
                        ? (
                          <a
                            href={row[col]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </a>
                        )
                        : String(row[col]))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
