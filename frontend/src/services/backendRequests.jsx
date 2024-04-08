import axios from 'axios';

//Get all Pokemon
export const getAllPokemon = async () => {
	const { data } = await axios.get('http://localhost:8000/pokemon/');
	return data;
};

//Get Pokemon by id
export const getPokemonById = async (id) => {
	const { data } = await axios.get(`http://localhost:8000/pokemon/${id}`);
	return data;
};

//Get Pokemon by id with additional info
export const getPokemonByIdWithInfo = async (id, info) => {
	const { data } = await axios.get(
		`http://localhost:8000/pokemon/${id}/${info}`
	);
	return data;
};

//Get all Kanto Pokemon from PokeApi / in this API is much more information about one pokemon. We limit only to the first 151 Pokemon. Because we are the real ones!

export const getKantoPokemon = async () => {
	const { data } = await axios.get(
		`https://pokeapi.co/api/v2/pokemon?limit=151`
	);
	return data.results;
};
