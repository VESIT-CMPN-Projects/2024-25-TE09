// components/operations/InsightsOperation.jsx
import React from "react";

const InsightsOperation = ({ setResults, setLoading, setError, loading }) => {
  const generateInsights = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/v1/csv-insights");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.status === "success") {
        setResults({
          insights: data.insights,
          llm_analysis: data.llm_analysis,
          visualizations: data.visualizations,
          type: "insights",
        });
      } else {
        throw new Error(data.message || "Failed to generate insights");
      }
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="operation-container">
      <button onClick={generateInsights} disabled={loading} className="operation-btn">
        Generate Insights
      </button>
      <div className="operation-message">
        {/* <p>Automatically generate insights from your data</p> */}
      </div>
    </div>
  );
};

export default InsightsOperation;
