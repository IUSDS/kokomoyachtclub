import React from "react";

export default function BookingHistoryTable({ transactions }) {
  // shared format function
  const formatAvailability = (avail) => {
    if (!avail) return "";
    const [startISO, endISO] = avail.split(" – ");
    const startDate = new Date(startISO);
    const endDate = new Date(endISO);

    const dateOpts = { year: "numeric", month: "short", day: "numeric" };
    const timeOpts = { hour: "numeric", minute: "2-digit" };

    const dateStr = new Intl.DateTimeFormat(undefined, dateOpts).format(
      startDate
    );
    const startStr = new Intl.DateTimeFormat(undefined, timeOpts).format(
      startDate
    );
    const endStr = new Intl.DateTimeFormat(undefined, timeOpts).format(endDate);

    return `${dateStr}, ${startStr} – ${endStr}`;
  };

  console.log(transactions);

  return (
    <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow">
      {transactions.data.length === 0 ? (
        <div className="text-center text-gray-500 py-6">No bookings found.</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Item",
                "Tour Type",
                "Booking ID",
                "Date",
                "Status",
                "Points",
                "Balance",
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
            <tr>
              <td className="px-4 py-2 text-sm font-semibold">
                Opening Balance
              </td>
              <td className="px-4 py-2 text-sm"></td>
              <td className="px-4 py-2 text-sm"></td>
              <td className="px-4 py-2 text-sm"></td>
              <td className="px-4 py-2 text-sm"></td>
              <td className="px-4 py-2 text-sm text-right"></td>
              <td className="px-4 py-2 text-sm text-right">
                {transactions.opening_balance}
              </td>
            </tr>

            {transactions.data.map((tx, index) => {
              if (tx.source === "Point Adjustment") {
                return (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm">{tx.description}</td>
                    <td className="px-4 py-2 text-sm"></td>
                    <td className="px-4 py-2 text-sm"></td>
                    <td className="px-8 py-2 text-sm">
                      {new Date(tx.date).toLocaleString("en-US", {
                        month: "short", // "Aug"
                        day: "numeric", // "20"
                        hour: "2-digit", // "03"
                        minute: "2-digit", // "15"
                        hour12: true, // AM/PM
                      })}
                    </td>
                    <td className="px-4 py-2 text-sm"></td>
                    <td className="px-4 py-2 text-sm text-right">
                      {tx.points}
                    </td>
                    <td className="px-4 py-2 text-sm text-right">
                      {tx.balance}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={tx.booking_id}>
                  <td className="px-4 py-2 text-sm">{tx.item}</td>
                  <td className="px-4 py-2 text-sm">{tx.tour_type}</td>
                  <td className="px-4 py-2 text-sm">{tx.booking_id}</td>
                  <td className="px-8 py-2 text-sm">
                    {new Date(
                      tx.start_at
                        .replace(" at ", " ")
                        .replace(" PM", " PM") 
                    ).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit", 
                      minute: "2-digit", 
                      hour12: true, 
                    })}
                  </td>
                  <td className="px-4 py-2 text-sm">{tx.status}</td>
                  <td className="px-4 py-2 text-sm text-right">{tx.points}</td>
                  <td className="px-4 py-2 text-sm text-right">{tx.balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </table>
  );
}
