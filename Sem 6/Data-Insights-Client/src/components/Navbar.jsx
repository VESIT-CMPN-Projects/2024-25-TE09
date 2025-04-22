import "./Components.css";

const Navbar = () => {
  return (
    <>
      <div className="nav-container">
        <div className="nav-hero">
          <div className="nav-logo">
            {" "}
            <img
              src="https://img.icons8.com/?size=160&id=eNxkAvdW2BDa&format=png"
              alt="logo"
            />
          </div>
          {/* <div className="nav-name">DataGram</div> */}
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/analyse-csv">Insights</a>
          {/* <a href="/generate-graph">Graph</a> */}
          <a href="/about">About</a>
        </div>
        <div className="auth-buttons">
          {/* <a href="/login" className="login">Login</a> */}
          <a href="/signup" className="signup">
            Sign-Out
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
