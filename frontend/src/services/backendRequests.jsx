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
