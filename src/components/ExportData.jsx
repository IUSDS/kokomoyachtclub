import React, { useState } from "react";

const ExportData = () => {
  const [visitorData, setVisitorData] = useState([]);
  const [visitorHeaders, setVisitorHeaders] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [memberHeaders, setMemberHeaders] = useState([]);

  // Fetch and display visitor data
  const handleFetchVisitorData = async () => {
    try {
      const response = await fetch("https://api.kokomoyachtclub.vip/export-data/export/visitors", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch visitor CSV data");
      }

      const data = await response.json();
      const rows = data.csv_data.split("\n").map((row) => row.split(","));

      if (rows.length > 1) {
        setVisitorHeaders(rows[0]); // First row as headers
        setVisitorData(rows.slice(1)); // Remaining rows as data
      }
    } catch (error) {
      console.error("Visitor data fetch failed:", error);
    }
  };

  // Fetch and display member data
  const handleFetchMemberData = async () => {
    try {
      const response = await fetch("https://api.kokomoyachtclub.vip/export-data/export/members", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch member CSV data");
      }

      const data = await response.json();
      const rows = data.csv_data.split("\n").map((row) => row.split(","));

      if (rows.length > 1) {
        setMemberHeaders(rows[0]); // First row as headers
        setMemberData(rows.slice(1)); // Remaining rows as data
      }
    } catch (error) {
      console.error("Member data fetch failed:", error);
    }
  };

  // Download CSV file
  const handleDownloadCSV = (headers, data, filename) => {
    const csvContent =
      [headers.join(","), ...data.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4">
      {/* Buttons to fetch data */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <button
          className="py-2 px-4 border rounded-lg bg-midnightblue text-white transition-colors duration-200"
          onClick={handleFetchVisitorData}
        >
          Load Visitor Data
        </button>
        <button
          className="py-2 px-4 border rounded-lg bg-midnightblue text-white transition-colors duration-200"
          onClick={handleFetchMemberData}
        >
          Load Member Data
        </button>
      </div>

      {/* Visitor Data Table */}
      {visitorData.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Visitor Data</h2>
            <button
              className="py-1 px-3 border rounded bg-green-600 text-white"
              onClick={() => handleDownloadCSV(visitorHeaders, visitorData, "visitors.csv")}
            >
              Download CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  {visitorHeaders.map((header, index) => (
                    <th key={index} className="border border-gray-300 px-4 py-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visitorData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="odd:bg-gray-100 even:bg-white">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Member Data Table */}
      {memberData.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Member Data</h2>
            <button
              className="py-1 px-3 border rounded bg-green-600 text-white"
              onClick={() => handleDownloadCSV(memberHeaders, memberData, "members.csv")}
            >
              Download CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  {memberHeaders.map((header, index) => (
                    <th key={index} className="border border-gray-300 px-4 py-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {memberData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="odd:bg-gray-100 even:bg-white">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportData;
