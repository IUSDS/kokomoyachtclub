import React, { useState, useEffect } from "react";
import BookingHistoryTable from "./BookingHistoryTable";

function formatAvailability(isoRange) {
  const [start, end] = isoRange.split(" – ");
  const parse = (s) => new Date(s.split("-")[0]);
  const d1 = parse(start),
    d2 = parse(end);
  const optsDate = { month: "numeric", day: "numeric", year: "2-digit" };
  const optsTime = { hour: "numeric", minute: "2-digit" };
  return (
    d1.toLocaleDateString("en-US", optsDate) +
    " at " +
    d1.toLocaleTimeString("en-US", optsTime) +
    " – " +
    d2.toLocaleTimeString("en-US", optsTime)
  );
}

export default function BookingHistoryContainer({ memberId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // build the correct URL
  const url = `${url}/booking/member/${memberId}/`;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) throw new Error(`Failed to load bookings (${res.status})`);
        const data = await res.json();

        // map server response into the shape your table expects
        const txs = data.map((b) => ({
          availability: formatAvailability(b.availability),
          bookingId: b.booking_id,
          item: b.item,
          contact: b.contact,
          debit: b.debit,
          credit: b.credit,
          totalPoints: b.total_points ?? 0,
        }));

        setTransactions(txs);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [memberId]);

  if (loading) return <p>Loading booking history…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <BookingHistoryTable
      openingBalance={0}
      bonusPoints={0}
      transactions={transactions}
      currentPoints={0}
    />
  );
}
