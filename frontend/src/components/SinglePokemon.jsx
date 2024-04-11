import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemonById } from '../services/backendRequests';
import { pokemonTypes } from '../services/pokemonCardsService';

function SinglePokemon() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [singlePokemon, setSinglePokemon] = useState({});

	useEffect(() => {
		getPokemonById(id)
			.then((data) => setSinglePokemon(data))
			.catch((error) => console.log(error));
	}, [id]);

	// const getCardBackground = () => {
	// 	return pokemonTypes[singlePokemon?.type[0]];
	// };

	return (
		<>
			<div className="w-[400px] h-[600px] bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500 rounded-md flex flex-col items-center justify-center shadow-zinc-700 shadow-xl ">
				<div
					// className={getCardBackground()}
					style={{
						width: '180px',
						height: '280px',
						borderRadius: '0.375rem',
					}}
				>
					{singlePokemon.id && (
						<div
							style={{
								backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${singlePokemon.id}.png)`,
							}}
							className="w-[360px] h-[300px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300 bg-white bg-opacity-85"
						></div>
					)}

					<div className="w-[160px] h-[70px] border-2 border-zinc-800 mx-auto mt-3 format ps-2">
						<h2 className="m-0"># {singlePokemon.id ?? 'Loading...'}</h2>
						<h3>{singlePokemon.name?.english ?? 'Loading...'}</h3>
					</div>
				</div>
			</div>
		</>
	);
}

export default SinglePokemon;
