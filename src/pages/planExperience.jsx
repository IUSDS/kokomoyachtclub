import React from "react";

const PlanExperience = () => {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="https://fareharbor.com/embeds/items/kokomocharters/?full-items=yes&fallback=simple&flow=1257684"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          overflow: "hidden",
        }}
        title="FareHarbor Item Grid"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};

export default PlanExperience;
