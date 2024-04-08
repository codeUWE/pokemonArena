import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPokemon } from '../services/backendRequests';

function AllPokemon() {
	const navigate = useNavigate();

	const [allPokemon, setAllPokemon] = useState([]);

	useEffect(() => {
		getAllPokemon()
			.then((data) => setAllPokemon(data))
			.catch((error) => console.log(error));
		// getPokemonImg;
	}, []);

	return (
		<>
			<div>
				{allPokemon.map((pokemon, index) => {
					return (
						<div key={index} className="format ">
							<h1>{pokemon.name.english}</h1>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default AllPokemon;
