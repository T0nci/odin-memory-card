import "./App.css";
import { fetchCards } from "./helpers.js";
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

  return (
    <>
      <header>
        <h1>Memory Card game</h1>
        <p>Best Score: {gameState.bestScore}</p>
      </header>
      <main>
        <p>Score: {gameState.score}</p>
        <section className="cards">
          {typeof cards === "string" ? (
            <p>{cards}</p>
          ) : cards.length <= 0 ? (
            <p>Loading...</p>
          ) : (
            cards.map((card) => {
              return (
                <button key={card.id}>
                  <img src={card.url} alt="" />
                  <p>{card.name[0].toUpperCase() + card.name.slice(1)}</p>
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
