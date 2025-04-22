// import Card from "../../components/Card";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="hero-content">
        <h1 className="hero-text">Analyze your data like an expert with AI.</h1>
        <h4 className="sub-hero-text">
          Chat with your files and get expert-level insights in seconds.
        </h4>
        <div className="hero-button">
          <Link className="try-button" to={"/analyse-csv"}>
            Try it out
          </Link>
        </div>
      </div>
      {/* <Card /> */}
    </>
  );
};

export default Home;
