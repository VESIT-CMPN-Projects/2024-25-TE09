// components/ResultsPanel.jsx
import React from "react";
import ReactMarkdown from "react-markdown";

const ResultsPanel = ({ results, type, setActiveViz }) => {
  if (!results) return null;

  const renderVisualizations = () => {
    if (!results?.visualizations) {
      return <p></p>;
    }

    return (
      <div className="visualizations">
        <div className="visualizations-grid">
          {Object.entries(results.visualizations).map(([key, viz]) => (
            <div
              key={key}
              className="visualization-card"
              onClick={() => setActiveViz(viz)}
            >
              {/* <h4>Visualization {key.split("_")[1]}</h4> */}
              <img
                src={`data:${viz.type};base64,${viz.data}`}
                alt={`Visualization ${key}`}
                className="visualization-image"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (type) {
      case "analysis":
        return (
          <div className="analysis-results">
            <h3>Analysis Results</h3>
            <ReactMarkdown>{results.answer}</ReactMarkdown>
            {results.analysis_code && (
              <div className="code-section">
                <h4>Analysis Code</h4>
                <pre>{results.analysis_code}</pre>
              </div>
            )}
          </div>
        );
      case "insights":
        return (
          <div className="insights-results">
            <h3>Insights</h3>
            <ReactMarkdown>
              {results.llm_analysis && results.llm_analysis[0]?.message}
            </ReactMarkdown>
            <div className="Visualization-figures">
              {renderVisualizations()}
            </div>
            <h6 className="warning">
              Note: The visualizations above are generated based on the data
              provided.
            </h6>
          </div>
        );
      case "visualization":
        return (
          <div className="visualization-results">
            <h3>Visualization Results</h3>
            <div className="Visualization-figures">
              {renderVisualizations()}
            </div>
            {results.visualization_code && (
              <div className="code-section">
                <h4>Visualization Code</h4>
                <pre>{results.visualization_code}</pre>
              </div>
            )}
            <h6 className="warning">
              Note: The data is generated based on the data
              provided and your query: "{results.query}"
            </h6>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="results-panel">{renderContent()}</div>;
};

export default ResultsPanel;
