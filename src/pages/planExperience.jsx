import React from "react";

const PlanExperience = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="https://fareharbor.com/embeds/calendar/kokomocharters/"
        style={{ 
          width: "100%", 
          height: "100%", 
          border: "none",
          overflow: "hidden"
        }}
        title="FareHarbor Calendar"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};

export default PlanExperience;