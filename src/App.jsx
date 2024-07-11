import "./App.css";
import { fetchCards, shuffleCards } from "./helpers.js";
import { v4 as uuidV4 } from "uuid";
import { useEffect, useState } from "react";

function App() {
  const [gameState, setGameState] = useState({
    score: 0,
    bestScore: 0,
  });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let ignore = false;

    fetchCards()
      .then((cards) => {
        if (!ignore) {
          setCards(
            cards.map((card) => {
              return {
                name: card.name,
                url: card.sprites.front_default,
                clicked: false,
                id: uuidV4(),
              };
            }),
          );
        }
      })
      .catch((err) => {
        setCards("Error loading cards! Check console for more information.");
        console.error(err);
      });

    return () => {
      ignore = true;
    };
  }, []);

  function handleClick(id) {
    for (const card of cards) {
      if (id === card.id) {
        if (card.clicked) {
          const newBestScore =
            gameState.score > gameState.bestScore
              ? gameState.score
              : gameState.bestScore;

          setGameState({
            bestScore: newBestScore,
            score: 0,
          });
          setCards(
            cards.map((card) => {
              return { ...card, clicked: false };
            }),
          );
        } else {
          setGameState({ ...gameState, score: gameState.score + 1 });
          setCards(
            cards.map((card) => {
              if (id === card.id) return { ...card, clicked: true };
              return { ...card };
            }),
          );
        }

        break;
      }
    }
  }

  return (
    <>
      <header>
        <h1 className="big-text bold center-text">Memory Card game</h1>
        <p className="medium-text center-text">
          Best Score: {gameState.bestScore}
        </p>
      </header>
      <main>
        <p className="medium-text center-text">Score: {gameState.score}</p>
        <section className="cards">
          {typeof cards === "string" ? (
            <p className="error">{cards}</p>
          ) : cards.length <= 0 ? (
            <p className="loading">Loading...</p>
          ) : (
            shuffleCards(cards).map((card) => {
              return (
                <button
                  className="card"
                  key={card.id}
                  onClick={() => {
                    handleClick(card.id);
                  }}
                >
                  <img src={card.url} alt="" />
                  <p className="small-medium-text center-text">
                    {card.name[0].toUpperCase() + card.name.slice(1)}
                  </p>
                </button>
              );
            })
          )}
        </section>
      </main>
    </>
  );
}

export default App;
