

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    const abilities = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name);
    const [ability] = abilities;
    pokemon.abilities = abilities
    pokemon.ability = ability;
    pokemon.height = "(0." + pokeDetail.height * 10 + " cm)";
    pokemon.weight = "(" + pokeDetail.weight /10 + " kg)";
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
}

  pokeApi.getPokemon = (id) => {
     const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
     return fetch(url)
      .then((response) => response.json())
      .then(convertPokeApiDetailToPokemon)
      .then((pokemonsDetails) => pokemonsDetails)
      .catch((error) => console.log(error));
  }

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error));
}


//  pokeApi.getPokemon = (url) => {
//      return fetch(url)
//      .then((response) => response.json())
//      .then((jsonBody) => jsonBody.results)
//      .then(pokeApi.getPokemonDetail)
//      .then((detailRequest) => Promise.all(detailRequest))
//      .then((pokemonsDetails) => pokemonsDetails)
//      .catch((error) => console.log(error));
//  }
    
