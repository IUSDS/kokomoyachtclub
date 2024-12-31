import React, { useEffect } from "react";

const PlanExperience = () => {
  useEffect(() => {
    // Dynamically load the script
    const script = document.createElement("script");
    script.src = "https://fareharbor.com/embeds/script/calendar/kokomocharters/?fallback=simple&full-items=yes&flow=1257684";
    script.async = true;
    script.defer = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-semiBold mb-4 text-midnightblue">Plan Your Experience</h1>
      <div id="kokomo-charters-calendar" className="w-full">
        {/* The content from the script will be displayed here */}
      </div>
    </div>
  );
};

export default PlanExperience;
