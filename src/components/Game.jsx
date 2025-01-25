import React, { useEffect, useState, useRef } from "react";

const Game = ({ user, updateLeaderboard }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [timeInMs, setTimeInMs] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameOverRef = useRef(false);

  const initializeGame = () => {
    const cardData = [
      {
        id: 1,
        value:
          "https://www.mfi.org.ph/wp-content/uploads/2023/04/Past-MFI-logo.png",
        flipped: false,
        matched: false,
      },
      {
        id: 2,
        value:
          "https://www.mfi.org.ph/wp-content/uploads/2023/04/Past-MFI-logo.png",
        flipped: false,
        matched: false,
      },
      {
        id: 3,
        value:
          "https://logos-world.net/wp-content/uploads/2020/05/Mazda-Logo.png",
        flipped: false,
        matched: false,
      },
      {
        id: 4,
        value:
          "https://logos-world.net/wp-content/uploads/2020/05/Mazda-Logo.png",
        flipped: false,
        matched: false,
      },
      {
        id: 5,
        value:
          "https://th.bing.com/th/id/OIP.u5LIM8ifr27FC2m562XivwHaGI?rs=1&pid=ImgDetMain",
        flipped: false,
        matched: false,
      },
      {
        id: 6,
        value:
          "https://th.bing.com/th/id/OIP.u5LIM8ifr27FC2m562XivwHaGI?rs=1&pid=ImgDetMain",
        flipped: false,
        matched: false,
      },
      {
        id: 7,
        value:
          "https://th.bing.com/th/id/OIP.H4oJhnFiCKhUeFvSMA-nxAHaHa?rs=1&pid=ImgDetMain",
        flipped: false,
        matched: false,
      },
      {
        id: 8,
        value:
          "https://th.bing.com/th/id/OIP.H4oJhnFiCKhUeFvSMA-nxAHaHa?rs=1&pid=ImgDetMain",
        flipped: false,
        matched: false,
      },
      {
        id: 9,
        value:
          "https://business.inquirer.net/files/2020/06/CDO-NEW-LOGO_CMYK_3D_Logo-620x434.png",
        flipped: false,
        matched: false,
      },
      {
        id: 10,
        value:
          "https://business.inquirer.net/files/2020/06/CDO-NEW-LOGO_CMYK_3D_Logo-620x434.png",
        flipped: false,
        matched: false,
      },
      {
        id: 11,
        value:
          "https://logos-download.com/wp-content/uploads/2021/01/Meralco_Logo.png",
        flipped: false,
        matched: false,
      },
      {
        id: 12,
        value:
          "https://logos-download.com/wp-content/uploads/2021/01/Meralco_Logo.png",
        flipped: false,
        matched: false,
      },
      {
        id: 13,
        value:
          "https://th.bing.com/th/id/OIP.a9yOFPh3pKFbwpVq_OVEogHaIM?w=1440&h=1592&rs=1&pid=ImgDetMain",
        flipped: false,
        matched: false,
      },
      {
        id: 14,
        value:
          "https://th.bing.com/th/id/OIP.a9yOFPh3pKFbwpVq_OVEogHaIM?w=1440&h=1592&rs=1&pid=ImgDetMain",
        flipped: false,
        matched: false,
      },
      {
        id: 15,
        value:
          "https://th.bing.com/th/id/OIP.nBYH_F7tPkLWGfYbyT5sqAHaFp?rs=1&pid=ImgDetMain",
        flipped: false,
        matched: false,
      },
      {
        id: 16,
        value:
          "https://th.bing.com/th/id/OIP.nBYH_F7tPkLWGfYbyT5sqAHaFp?rs=1&pid=ImgDetMain",
        flipped: false,
        matched: false,
      },
      {
        id: 17,
        value:
          "https://download.logo.wine/logo/Cummins/Cummins-Logo.wine.png",
        flipped: false,
        matched: false,
      },
      {
        id: 18,
        value:
          "https://download.logo.wine/logo/Cummins/Cummins-Logo.wine.png",
        flipped: false,
        matched: false,
      },
    ];

    setCards(shuffleArray(cardData));
    setTimeInMs(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
    setGameOver(false);
    gameOverRef.current = false;
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardFlip = (index) => {
    if (flippedCards.length === 2 || cards[index].flipped || gameOver) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setFlippedCards((prev) => [...prev, index]);
    setCards(updatedCards);

    if (flippedCards.length === 1) {
      const [firstIndex] = flippedCards;
      if (updatedCards[firstIndex].value === updatedCards[index].value) {
        setMatchedCards((prev) => [...prev, updatedCards[firstIndex].value]);
        setScore((prev) => prev + 1);
      }

      setTimeout(() => {
        updatedCards[firstIndex].flipped = false;
        updatedCards[index].flipped = false;
        setFlippedCards([]);
        setCards(updatedCards);
      }, 1000);
    }
  };

  useEffect(() => {
    if (cards.length == 0) return;

    let interval;
    if (!gameOver) {
      interval = setInterval(() => setTimeInMs((prev) => prev + 100), 100);
    }
    return () => clearInterval(interval);
  }, [gameOver, cards]);

  useEffect(() => {
    if (score >= 9 && !gameOverRef.current) {
      gameOverRef.current = true;
      setGameOver(true);
      localStorage.setItem(
        "gameProgress",
        JSON.stringify({ score, timeInMs, matchedCards })
      );
      updateLeaderboard(score, timeInMs, user);

      setTimeout(() => {
        const updatedCards = cards.map((card) => ({
          ...card,
          flipped: true,
        }));
        setCards(updatedCards);
      }, 2000);
    }
  }, [score, cards.length, matchedCards, timeInMs, updateLeaderboard]);

  const handleTryAgain = () => {
    initializeGame();
  };

  useEffect(() => {
    initializeGame();
  }, [user]);

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
      <div style={{ padding: "10px", fontSize: "1.5rem" }}>
        <h3>Score: {score}</h3>
        <h3>Time: {formatTime(timeInMs)}</h3>
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? "flipped" : ""}`}
            onClick={() => handleCardFlip(index)}
          >
            {card.flipped || matchedCards.includes(card.value) ? (
 
                <img
                  src={`${card.value}`}
                  alt={`${card.value}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    transform: matchedCards.includes(card.value) ? "rotateY(0deg)" : "rotateY(180deg)",
                 
                  }}
                />
        
            ) : (
              "❓"
            )}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your score: {score}</p>
          <p>Your time: {formatTime(timeInMs)}</p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
