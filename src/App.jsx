import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Game from "./components/Game";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("userName") || "");
  const [leaderboard, setLeaderboard] = useState([]);

  
  useEffect(() => {
    const storedLeaderboard =
      JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderboard(storedLeaderboard);
  }, []);

  
  const handleLogout = () => {
    
    localStorage.removeItem("userName");
    setUser("");
  };

  
  const updateLeaderboard = (score, time, userName) => {
    const newLeaderboard = [...leaderboard, { score, time, userName }];
    
    newLeaderboard.sort((a, b) => b.score - a.score || a.time - b.time);
    setLeaderboard(newLeaderboard);
    localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard));
  };

  
  const formatTime = (timeInMs) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const milliseconds = timeInMs % 1000;

    return `${minutes < 10 ? "0" : ""}${minutes}m:${
      seconds < 10 ? "0" : ""
    }${seconds}s:${milliseconds < 100 ? "0" : ""}${milliseconds}ms`;
  };

  return (
    <div>
      <span className=" flex items-center font-bold bg-[#007bff] text-white">
        <img
          src="https://www.mfi.org.ph/wp-content/uploads/2020/04/mfi-logo.png"
          alt=""
          className="w-20"
        />
        <h1 className="text-3xl">Memory Card Game</h1>
      </span>
      {user ? (
        <>
          <div
            className="flex items-center justify-between"
            style={{ padding: "10px" }}
          >
            <h2 className="font-bold " style={{ fontSize: "3rem" }}>
              Welcome, {user}
            </h2>{" "}
            <button onClick={handleLogout}>Quit</button>
          </div>
          <Game user={user} updateLeaderboard={updateLeaderboard} />
        </>
      ) : (
        <Login setUser={setUser} />
      )}
      <div className="leaderboard-container">
        <h3 className="title">Leaderboard</h3>
        <div>
          {leaderboard.length == 0 ? (
            <p>No scores yet!</p>
          ) : (
            <div className="leaderboard">
              {leaderboard.slice(0, 3).map((entry, index) => (
                <div className="entry" key={index}>
                  <span className="rank">{index + 1}</span>
                  <span className="name"> {entry.userName}</span>
                  <span className="score">
                    {entry.score} points, {formatTime(entry.time)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
