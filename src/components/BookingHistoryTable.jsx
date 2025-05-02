import React from "react";

export default function BookingHistoryTable({
  openingBalance,
  bonusPoints,
  transactions,
  currentPoints,
}) {
  return (
    <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-semibold text-midnightblue">
            Availability
          </th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-midnightblue">
            Booking ID
          </th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-midnightblue">
            Item
          </th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-midnightblue">
            Contact
          </th>
          <th className="px-4 py-2 text-right text-sm font-semibold text-midnightblue">
            Debit
          </th>
          <th className="px-4 py-2 text-right text-sm font-semibold text-midnightblue">
            Credit
          </th>
          <th className="px-4 py-2 text-right text-sm font-semibold text-midnightblue">
            Total Points
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {/* Opening Balance */}
        <tr className="">
          <td className="px-4 py-2 text-sm">Opening Balance</td>
          <td className="px-4 py-2" />
          <td className="px-4 py-2" />
          <td className="px-4 py-2" />
          <td className="px-4 py-2" />
          <td className="px-4 py-2" />
          <td className="px-4 py-2 text-right text-sm">{openingBalance}</td>
        </tr>

        {/* Bonus Points */}
        <tr>
          <td className="px-4 py-2 text-sm">Bonus Points</td>
          <td className="px-4 py-2" />
          <td className="px-4 py-2" />
          <td className="px-4 py-2" />
          <td className="px-4 py-2" />
          <td className="px-4 py-2 text-right text-sm">{bonusPoints}</td>
          <td className="px-4 py-2" />
        </tr>

        {/* Actual bookings */}
        {transactions.map((tx) => (
          <tr key={tx.bookingId}>
            <td className="px-4 py-2 text-sm">{tx.availability}</td>
            <td className="px-4 py-2 text-sm">{tx.bookingId}</td>
            <td className="px-4 py-2 text-sm">{tx.item}</td>
            <td className="px-4 py-2 text-sm">{tx.contact}</td>
            <td className="px-4 py-2 text-right text-sm">{tx.debit || ""}</td>
            <td className="px-4 py-2 text-right text-sm">{tx.credit || ""}</td>
            <td className="px-4 py-2 text-right text-sm">{tx.totalPoints}</td>
          </tr>
        ))}
      </tbody>

      <tfoot className="bg-gray-50">
        <tr>
          <td className="px-4 py-2 font-semibold text-midnightblue">
            Current Points Balance
          </td>
          <td colSpan={5} />
          <td className="px-4 py-2 text-right font-bold text-midnightblue">
            {currentPoints}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
