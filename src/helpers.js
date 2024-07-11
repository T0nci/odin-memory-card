const url = "https://pokeapi.co/api/v2/pokemon/";

function randomPokemonIds(count) {
  // 1025 is the max ID for pokemon
  if (count > 1025) throw new Error("1025 is the max amount!");

  let ids = new Set();
  while (ids.size < count) {
    const id = Math.ceil(Math.random() * 1025);
    ids.add(id);
  }

  return ids;
}

function fetchCards(numberOfCards = 12) {
  const idsToFetch = [...randomPokemonIds(numberOfCards)];

  const promisesArray = idsToFetch.map((id) => {
    return fetch(url + id).then((response) => response.json());
  });

  return Promise.all(promisesArray);
}

export { fetchCards };
