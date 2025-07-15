import React, { useState, useEffect } from "react";
import BookingHistoryTable from "./BookingHistoryTable";

// Determine API base: localhost for dev, same protocol + domain for prod
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
const API_BASE = isLocal
  ? "http://localhost:8000"
  : `${window.location.protocol}//api.kokomoyachtclub.vip`;

export default function BookingHistoryContainer({ memberId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`${API_BASE}/booking/member/${memberId}`, {
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
    <>
      {/* <p className="text-2xl font-bold text-midnightblue mb-4">
        Opening Balance: {transactions.opening_balance}
      </p> */}
      <BookingHistoryTable
        transactions={transactions}
      />
    </>
  );
}
