  // import React, { useState } from "react";
  // import ReactMarkdown from "react-markdown";
  // import "./FinalComponent.css";

  // const DataAnalysisPage = () => {
  //   const [file, setFile] = useState(null);
  //   const [fileStatus, setFileStatus] = useState(null);
  //   const [query, setQuery] = useState("");
  //   const [vizRequest, setVizRequest] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");
  //   const [results, setResults] = useState(null);
  //   const [activeViz, setActiveViz] = useState(null);
  //   const [analysisQuery, setAnalysisQuery] = useState("");

  //   const handleFileUpload = async (event) => {
  //     const selectedFile = event.target.files[0];
  //     if (!selectedFile) return;

  //     if (!selectedFile.name.endsWith(".csv")) {
  //       setError("Please upload a CSV file");
  //       return;
  //     }

  //     setLoading(true);
  //     setError("");

  //     const formData = new FormData();
  //     formData.append("file", selectedFile);

  //     try {
  //       const response = await fetch("http://localhost:5000/v1/csv-upload", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();

  //       if (data.status === "success") {
  //         setFile(selectedFile);
  //         setFileStatus(data.file_details);
  //       } else {
  //         throw new Error(data.message || "Upload failed");
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //       setFile(null);
  //       setFileStatus(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const handleQuery = async () => {
  //     if (!query.trim()) {
  //       setError("Please enter a query");
  //       return;
  //     }

  //     setLoading(true);
  //     setError("");

  //     try {
  //       const response = await fetch("http://localhost:5000/v1/csv-query", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ query }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();

  //       if (data.status === "success") {
  //         setResults({
  //           queryResults: data.query_results,
  //           type: "query",
  //         });
  //       } else {
  //         throw new Error(data.message || "Query failed");
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //       setResults(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const handleAnalysis = async () => {
  //     if (!analysisQuery.trim()) {
  //       setError("Please enter an analysis query");
  //       return;
  //     }

  //     setLoading(true);
  //     setError("");

  //     try {
  //       const response = await fetch("http://localhost:5000/v1/query-analysis", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ query: analysisQuery }),
  //       });

  //       if (!response.ok) throw new Error("Network response was not ok");

  //       const data = await response.json();
  //       if (data.status === "success") {
  //         setResults({
  //           result: data.result,
  //           answer: data.answer,
  //           analysis_code: data.analysis_code,
  //           query: data.query,
  //           type: "analysis",
  //         });
  //       } else {
  //         throw new Error(data.message || "Analysis failed");
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //       setResults(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const generateInsights = async () => {
  //     setLoading(true);
  //     setError("");

  //     try {
  //       const response = await fetch("http://localhost:5000/v1/csv-insights");

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();

  //       if (data.status === "success") {
  //         setResults({
  //           insights: data.insights,
  //           llm_analysis: data.llm_analysis,
  //           visualizations: data.visualizations,
  //           type: "insights",
  //         });
  //       } else {
  //         throw new Error(data.message || "Failed to generate insights");
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //       setResults(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const handleVisualization = async () => {
  //     if (!vizRequest.trim()) {
  //       setError("Please enter a visualization request");
  //       return;
  //     }

  //     setLoading(true);
  //     setError("");

  //     try {
  //       const response = await fetch(
  //         "http://localhost:5000/v1/query-visualizations",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ query: vizRequest }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();

  //       if (data.status === "success") {
  //         setResults({
  //           insights: data.insights,
  //           visualizations: data.visualizations,
  //           visualization_code: data.visualization_code,
  //           type: "visualization",
  //         });
  //       } else {
  //         throw new Error(data.message || "Visualization failed");
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //       setResults(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const renderVisualizations = () => {
  //     if (!results?.visualizations) {
  //       return "No visualization could be generated";
  //     }

  //     return (
  //       <div className="visualizations">
  //         <div className="visualizations-grid">
  //           {Object.entries(results.visualizations).map(([key, viz]) => (
  //             <div
  //               key={key}
  //               className="visualization-card"
  //               onClick={() => setActiveViz(viz)}
  //             >
  //               <h4>Visualization {key.split("_")[1]}</h4>
  //               <img
  //                 src={`data:${viz.type};base64,${viz.data}`}
  //                 alt={`Visualization ${key}`}
  //                 className="visualization-image"
  //               />
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     );
  //   };

  //   const renderQueryResults = () => {
  //     if (!results?.queryResults) return null;

  //     return (
  //       <div className="query-results">
  //         <h3>Query Results</h3>
  //         <div className="results-content">
  //           <ReactMarkdown>
  //             {results.queryResults.llm_response[0].message}
  //           </ReactMarkdown>
  //         </div>
  //       </div>
  //     );
  //   };

  //   const renderModal = () => {
  //     if (!activeViz) return null;

  //     return (
  //       <div className="modal-overlay" onClick={() => setActiveViz(null)}>
  //         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
  //           <button className="close-button" onClick={() => setActiveViz(null)}>
  //             ×
  //           </button>
  //           <img
  //             src={`data:${activeViz.type};base64,${activeViz.data}`}
  //             alt="Visualization"
  //             className="modal-image"
  //           />
  //         </div>
  //       </div>
  //     );
  //   };

  //   return (
  //     <div className="container">
  //       <div className="card">
  //         <h2>What do you want to analyze today?</h2>

  //         <div className="file-upload">
  //           <input type="file" accept=".csv" onChange={handleFileUpload} />
  //         </div>

  //         {fileStatus && (
  //           <div className="file-status">File uploaded: {fileStatus.name}</div>
  //         )}

  //         {file && (
  //           <>
  //             <div className="query-section">
  //               <input
  //                 type="text"
  //                 placeholder="Enter your query..."
  //                 value={query}
  //                 onChange={(e) => setQuery(e.target.value)}
  //               />
  //               <button onClick={handleQuery} disabled={loading}>
  //                 Query
  //               </button>
  //               <button onClick={generateInsights} disabled={loading}>
  //                 Generate Insights
  //               </button>
  //             </div>
  //             <div className="query-section">
  //               <input
  //                 type="text"
  //                 placeholder="Enter your analysis query..."
  //                 value={analysisQuery}
  //                 onChange={(e) => setAnalysisQuery(e.target.value)}
  //               />
  //               <button onClick={handleAnalysis} disabled={loading}>
  //                 Analyze
  //               </button>
  //             </div>
  //             <div className="visualization-section">
  //               <input
  //                 type="text"
  //                 placeholder="Describe the visualization you want..."
  //                 value={vizRequest}
  //                 onChange={(e) => setVizRequest(e.target.value)}
  //               />
  //               <button onClick={handleVisualization} disabled={loading}>
  //                 Visualize
  //               </button>
  //             </div>
  //           </>
  //         )}

  //         {error && <div className="error-message">{error}</div>}
  //         {loading && <div className="loading">Processing...</div>}

  //         {results && (
  //           <div className="results">
  //             {results.type === "query" && renderQueryResults()}
  //             {results.type === "insights" && (
  //               <div>
  //                 <h3>Insights</h3>
  //                 <ReactMarkdown>
  //                   {results.llm_analysis && results.llm_analysis[0]?.message}
  //                 </ReactMarkdown>
  //                 <div className="Visualization-figures">
  //                   {renderVisualizations()}
  //                 </div>
  //                 <h6 className="warning">
  //                   Note: The visualizations above are generated based on the data
  //                   provided.
  //                 </h6>
  //               </div>
  //             )}
  //             {results.type === "visualization" && (
  //               <div>
  //                 <h3>Visualization Results</h3>
  //                 <div className="Visualization-figures">
  //                   {renderVisualizations()}
  //                 </div>
  //                 {results.visualization_code && (
  //                   <div className="code-section">
  //                     <h4>Visualization Code</h4>
  //                     <pre>{results.visualization_code}</pre>
  //                   </div>
  //                 )}
  //                 <h6 className="warning">
  //                   Note: The visualizations above are generated based on the data
  //                   provided and your query: "{vizRequest}"
  //                 </h6>
  //               </div>
  //             )}
  //             {results.type === "analysis" && (
  //               <div>
  //                 <h3>Analysis Results</h3>
  //                 <ReactMarkdown>{results.answer}</ReactMarkdown>
  //                 {results.analysis_code && (
  //                   <div className="code-section">
  //                     <h4>Analysis Code</h4>
  //                     <pre>{results.analysis_code}</pre>
  //                   </div>
  //                 )}
  //               </div>
  //             )}
  //           </div>
  //         )}
  //       </div>
  //       {renderModal()}
  //     </div>
  //   );
  // };

  // export default DataAnalysisPage;
