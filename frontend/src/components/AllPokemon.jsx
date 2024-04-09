import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPokemon } from '../services/backendRequests';
import { pokemonTypes } from '../services/pokemonCardsService';

function AllPokemon() {
	const [allPokemon, setAllPokemon] = useState([]);

	useEffect(() => {
		getAllPokemon()
			.then((data) => setAllPokemon(data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			<div className="w-full ">
				<div className="w-[90%] mx-auto flex flex-auto gap-6 flex-wrap justify-evenly">
					{/* start map here */}
					{allPokemon.map((pokemon, index) => {
						const getCardBackground = () => {
							return pokemonTypes[pokemon.type[0]];
						};
						return (
							<>
								<div
									className="w-[200px] h-[300px] bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500 rounded-md flex items-center justify-center shadow-zinc-700 shadow-xl"
									key={index}
								>
									<div
										className={getCardBackground()}
										style={{
											width: '180px',
											height: '280px',
											borderRadius: '0.375rem',
										}}
									>
										<div
											style={{
												backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png)`,
												backgroundColor: 'white',
											}}
											className="w-[160px] h-[140px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300"
										></div>
										<div className="w-[160px] h-[70px] border-2 border-black mx-auto mt-3"></div>
									</div>
								</div>
							</>
						);
					})}

					{/* end of one card */}
				</div>
			</div>
		</>
	);
}

export default AllPokemon;
