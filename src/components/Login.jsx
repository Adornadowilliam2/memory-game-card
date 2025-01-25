// src/components/Login.jsx
import React, { useState } from "react";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // Save user name to localStorage
      localStorage.setItem("userName", name);
      setUser(name);
    }
  };

  return (
    <div className="login-container">
      <h2>Enter your name to start the game</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          maxLength={8} 
          className="border-[2px] bg-[#ccc]"
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default Login;
