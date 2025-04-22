import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
// import DataAnalysisPage from "./FinalComponent";
import AnalyzeCSV from "./pages/Analyze-CSV/AnalyzeCSV";
function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/analyse-csv" element={<AnalyzeCSV />} />
        </Routes>
      </Router>
      {/* <Footer /> */}
    </>
  );
}

export default App;
