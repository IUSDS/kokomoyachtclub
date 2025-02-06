import React from "react";

const ExportData = () => {
  const handleExportMember = async () => {
    // console.log("Exporting Member Data...");
    try {
      const response = await fetch("https://api.kokomoyachtclub.vip/export-data/export/members", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch CSV data");
      }

      const data = await response.json();
      const csvContent = data.csv_data;

      // Convert CSV data to Blob
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      
      // Create a hidden download link
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename || "members.csv"; // Default filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleExportVisitor = async () => {
    // console.log("Exporting Visitor Data...");
    try {
      const response = await fetch("https://api.kokomoyachtclub.vip/export-data/export/visitors", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch CSV data");
      }

      const data = await response.json();
      const csvContent = data.csv_data;

      // Convert CSV data to Blob
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      
      // Create a hidden download link
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename || "visitors.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const actions = [
    { label: "Member Data", type: "exportMemberData", function: handleExportMember },
    { label: "Visitor Data", type: "exportVisitorData", function: handleExportVisitor }
  ];

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      {actions.map((action) => (
        <button
          key={action.type}
          className="py-2 px-4 border rounded-lg bg-midnightblue text-white transition-colors duration-200"
          onClick={action.function}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ExportData;
