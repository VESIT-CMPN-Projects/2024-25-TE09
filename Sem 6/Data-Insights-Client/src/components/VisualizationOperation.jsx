// components/operations/VisualizationOperation.jsx
import React, { useState } from "react";

const VisualizationOperation = ({
  setResults,
  setLoading,
  setError,
  loading,
}) => {
  const [vizRequest, setVizRequest] = useState("");

  const handleVisualization = async () => {
    if (!vizRequest.trim()) {
      setError("Please enter a visualization request");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/v1/query-visualizations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: vizRequest }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.status === "success") {
        setResults({
          insights: data.insights,
          visualizations: data.visualizations,
          visualization_code: data.visualization_code,
          type: "visualization",
          query: vizRequest,
        });
      } else {
        throw new Error(data.message || "Visualization failed");
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
      <div className="operation-input">
        <input
          type="text"
          placeholder="Describe the visualization you want (e.g., 'Bar chart of sales by month')"
          value={vizRequest}
          onChange={(e) => setVizRequest(e.target.value)}
        />
        <button onClick={handleVisualization} disabled={loading}>
          Create Visualization
        </button>
      </div>
    </div>
  );
};

export default VisualizationOperation;
