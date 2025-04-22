import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill in both fields");
      return;
    }
    navigate("/extract-insight");
    console.log("Logging in with:", { email, password });
  };

  const handleThirdPartyLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Add provider-specific logic here, e.g., API calls or redirects
  };

  return (
    <div className="login-container">
      <div className="input-fields">
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      <div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div className="separator">or login with</div>
      <div className="third-party-login">
        <button
          className="google-login"
          onClick={() => handleThirdPartyLogin("Google")}
        >
          Login with Google
        </button>
        <button
          className="github-login"
          onClick={() => handleThirdPartyLogin("GitHub")}
        >
          Login with GitHub
        </button>
        {/* Add more providers as needed */}
      </div>
    </div>
  );
};

export default Login;
