// components/OperationTabs.jsx
import React from "react";

const OperationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="operation-tabs">
      <button
        className={`tab-button ${activeTab === "insights" ? "active" : ""}`}
        onClick={() => setActiveTab("insights")}
      >
        Generate Insights
      </button>
      <button
        className={`tab-button ${activeTab === "analysis" ? "active" : ""}`}
        onClick={() => setActiveTab("analysis")}
      >
        Data Analysis
      </button>

      <button
        className={`tab-button ${
          activeTab === "visualization" ? "active" : ""
        }`}
        onClick={() => setActiveTab("visualization")}
      >
        Create Visualizations
      </button>
    </div>
  );
};

export default OperationTabs;
