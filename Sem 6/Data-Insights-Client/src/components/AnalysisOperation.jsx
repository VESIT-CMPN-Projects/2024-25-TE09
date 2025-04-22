// components/operations/AnalysisOperation.jsx
import React, { useState } from "react";

const AnalysisOperation = ({ setResults, setLoading, setError, loading }) => {
  const [analysisQuery, setAnalysisQuery] = useState("");

  const handleAnalysis = async () => {
    if (!analysisQuery.trim()) {
      setError("Please enter an analysis query");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/v1/query-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: analysisQuery }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (data.status === "success") {
        setResults({
          result: data.result,
          answer: data.answer,
          analysis_code: data.analysis_code,
          query: data.query,
          type: "analysis",
        });
      } else {
        throw new Error(data.message || "Analysis failed");
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
          placeholder="What would you like to analyze? (e.g., 'Show summary statistics')"
          value={analysisQuery}
          onChange={(e) => setAnalysisQuery(e.target.value)}
        />
        <button onClick={handleAnalysis} disabled={loading}>
          Analyze
        </button>
      </div>
    </div>
  );
};

export default AnalysisOperation;