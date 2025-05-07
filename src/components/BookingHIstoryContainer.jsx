import React, { useState, useEffect } from "react";
import BookingHistoryTable from "./BookingHistoryTable";

// Simple base URL detection
const isLocal = window.location.hostname === "localhost";
const API_BASE = isLocal
  ? "http://localhost:8000"
  : "https://api.kokomoyachtclub.vip";

export default function BookingHistoryContainer({ memberId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`${API_BASE}/booking/member/${memberId}/`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load bookings");
        return res.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [memberId]);

  if (loading) return <p>Loading booking history…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <BookingHistoryTable
      transactions={transactions}
      openingBalance={0}
      bonusPoints={0}
      currentPoints={0}
    />
  );
}
