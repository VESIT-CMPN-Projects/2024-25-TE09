import React, { useState } from "react";
import FileUploadSection from "../../components/FileUpload";
import OperationTabs from "../../components/OperationsTab";
import AnalysisOperation from "../../components/AnalysisOperation";
import InsightsOperation from "../../components/InsightsOperation";
import VisualizationOperation from "../../components/VisualizationOperation";
import ResultsPanel from "../../components/ResultsPanel";
import "./AnalyzeCSV.css";

const AnalyzeCSV = () => {
  const [file, setFile] = useState(null);
  const [fileStatus, setFileStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("analysis");

  // Results for each operation type
  const [analysisResults, setAnalysisResults] = useState(null);
  const [insightResults, setInsightResults] = useState(null);
  const [visualizationResults, setVisualizationResults] = useState(null);
  const [activeViz, setActiveViz] = useState(null);

  const handleFileUpload = async (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/v1/csv-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.status === "success") {
        setFile(selectedFile);
        setFileStatus(data.file_details);
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (err) {
      setError(err.message);
      setFile(null);
      setFileStatus(null);
    } finally {
      setLoading(false);
    }
  };

  // Determine which operation component to show
  const renderActiveOperation = () => {
    switch (activeTab) {
      case "analysis":
        return (
          <AnalysisOperation
            setResults={setAnalysisResults}
            setLoading={setLoading}
            setError={setError}
            loading={loading}
          />
        );
      case "insights":
        return (
          <InsightsOperation
            setResults={setInsightResults}
            setLoading={setLoading}
            setError={setError}
            loading={loading}
          />
        );
      case "visualization":
        return (
          <VisualizationOperation
            setResults={setVisualizationResults}
            setLoading={setLoading}
            setError={setError}
            setActiveViz={setActiveViz}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  // Get current results based on active tab
  const getCurrentResults = () => {
    switch (activeTab) {
      case "analysis":
        return analysisResults;
      case "insights":
        return insightResults;
      case "visualization":
        return visualizationResults;
      default:
        return null;
    }
  };

  const renderModal = () => {
    if (!activeViz) return null;

    return (
      <div className="modal-overlay" onClick={() => setActiveViz(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={() => setActiveViz(null)}>
            ×
          </button>
          <img
            src={`data:${activeViz.type};base64,${activeViz.data}`}
            alt="Visualization"
            className="modal-image"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="card">
        <h3>What do you want to analyze today?</h3>

        <FileUploadSection
          handleFileUpload={handleFileUpload}
          fileStatus={fileStatus}
        />

        {file && (
          <>
            <OperationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderActiveOperation()}
          </>
        )}

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading">Processing...</div>}

        <ResultsPanel
          results={getCurrentResults()}
          type={activeTab}
          setActiveViz={setActiveViz}
        />
      </div>
      {renderModal()}
    </div>
  );
};

export default AnalyzeCSV;