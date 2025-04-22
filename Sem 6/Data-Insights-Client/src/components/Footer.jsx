import "./Components.css";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-hero">
          <div className="footer-logo">
            <img
              src="https://img.icons8.com/?size=160&id=eNxkAvdW2BDa&format=png"
              alt="logo"
            />
          </div>
          <div className="footer-name">
            <h1>DataGram</h1>
          </div>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/extract-insight">Insights</a>
          <a href="/generate-graph">Graph</a>
          <a href="/about">About</a>
        </div>
      </div>
    </>
  );
};

export default Footer;
