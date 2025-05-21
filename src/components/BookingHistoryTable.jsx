import React from "react";

export default function BookingHistoryTable({
  transactions,
  currentPoints,
}) {
  // shared format function
  const formatAvailability = (avail) => {
    if (!avail) return "";
    const [startISO, endISO] = avail.split(" – ");
    const startDate = new Date(startISO);
    const endDate   = new Date(endISO);

    const dateOpts = { year: "numeric", month: "short", day: "numeric" };
    const timeOpts = { hour: "numeric", minute: "2-digit" };

    const dateStr  = new Intl.DateTimeFormat(undefined, dateOpts).format(startDate);
    const startStr = new Intl.DateTimeFormat(undefined, timeOpts).format(startDate);
    const endStr   = new Intl.DateTimeFormat(undefined, timeOpts).format(endDate);

    return `${dateStr}, ${startStr} – ${endStr}`;
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow">
      <thead className="bg-gray-50">
        <tr>
          {[
            "Availability",
            "Booking ID",
            "Item",
            "Email",
            "Points Used",
            // "Credit",
            // "Total Points",
          ].map((heading) => (
            <th
              key={heading}
              className="px-4 py-2 text-left text-sm font-semibold text-midnightblue"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {transactions.map((tx) => (
          <tr key={tx.booking_id}>
            <td className="px-4 py-2 text-sm">
              {formatAvailability(tx.availability)}
            </td>
            <td className="px-4 py-2 text-sm">{tx.booking_id}</td>
            <td className="px-4 py-2 text-sm">{tx.item}</td>
            <td className="px-4 py-2 text-sm">{tx.contact}</td>
            <td className="px-4 py-2 text-right text-sm">
              {tx.debit ?? ""}
            </td>
            {/* <td className="px-4 py-2 text-right text-sm">
              {tx.credit ?? ""}
            </td>
            <td className="px-4 py-2 text-right text-sm">
              {tx.currentpoints}
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
