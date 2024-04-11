import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllPokemon } from '../services/backendRequests';
import { pokemonTypes } from '../services/pokemonCardsService';

//flowbite assets
import { Tabs } from 'flowbite-react';

//icons
import Mew from '../assets/iconMew.png';

function AllPokemon() {
	const [allPokemon, setAllPokemon] = useState([]);

	useEffect(() => {
		getAllPokemon()
			.then((data) => setAllPokemon(data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			<div>
				<Tabs aria-label="Tabs with underline" style="underline">
					<Tabs.Item active title="Kanto-Dex">
						<div className="w-full mt-10 ">
							<div className="w-[90%] mx-auto flex flex-auto gap-6 flex-wrap justify-evenly">
								{allPokemon.slice(0, 151).map((pokemon, index) => {
									const getCardBackground = () => {
										return pokemonTypes[pokemon.type[0]];
									};
									return (
										<>
											<div
												className="w-[200px] h-[300px] bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500 rounded-md flex items-center justify-center shadow-zinc-700 shadow-xl hover:animate-pulse hover:cursor-pointer"
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
														}}
														className="w-[160px] h-[140px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300 bg-white bg-opacity-85"
													></div>
													<div className="w-[160px] h-[70px] border-2 border-zinc-800 mx-auto mt-3 format ps-2">
														<h2 className="m-0"># {pokemon.id}</h2>
														<h3>{pokemon.name.english}</h3>
													</div>
												</div>
											</div>
										</>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Johto-Dex">
						<div className="w-full mt-10 ">
							<div className="w-[90%] mx-auto flex flex-auto gap-6 flex-wrap justify-evenly">
								{allPokemon.slice(151, 251).map((pokemon, index) => {
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
														}}
														className="w-[160px] h-[140px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300 bg-white bg-opacity-85"
													></div>
													<div className="w-[160px] h-[70px] border-2 border-zinc-800 mx-auto mt-3 format ps-2">
														<h2 className="m-0"># {pokemon.id}</h2>
														<h3>{pokemon.name.english}</h3>
													</div>
												</div>
											</div>
										</>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Hoenn-Dex">
						<div className="w-full mt-10 ">
							<div className="w-[90%] mx-auto flex flex-auto gap-6 flex-wrap justify-evenly">
								{allPokemon.slice(251, 386).map((pokemon, index) => {
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
														}}
														className="w-[160px] h-[140px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300 bg-white bg-opacity-85"
													></div>
													<div className="w-[160px] h-[70px] border-2 border-zinc-800 mx-auto mt-3 format ps-2">
														<h2 className="m-0"># {pokemon.id}</h2>
														<h3>{pokemon.name.english}</h3>
													</div>
												</div>
											</div>
										</>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Sinnoh-Dex">
						<div className="w-full mt-10 ">
							<div className="w-[90%] mx-auto flex flex-auto gap-6 flex-wrap justify-evenly">
								{allPokemon.slice(386, 493).map((pokemon, index) => {
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
														}}
														className="w-[160px] h-[140px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300 bg-white bg-opacity-85"
													></div>
													<div className="w-[160px] h-[70px] border-2 border-zinc-800 mx-auto mt-3 format ps-2">
														<h2 className="m-0"># {pokemon.id}</h2>
														<h3>{pokemon.name.english}</h3>
													</div>
												</div>
											</div>
										</>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Einall-Dex">
						<div className="w-full mt-10 ">
							<div className="w-[90%] mx-auto flex flex-auto gap-6 flex-wrap justify-evenly">
								{allPokemon.slice(493, 649).map((pokemon, index) => {
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
														}}
														className="w-[160px] h-[140px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300 bg-white bg-opacity-85"
													></div>
													<div className="w-[160px] h-[70px] border-2 border-zinc-800 mx-auto mt-3 format ps-2">
														<h2 className="m-0"># {pokemon.id}</h2>
														<h3>{pokemon.name.english}</h3>
													</div>
												</div>
											</div>
										</>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Kalos-Dex">
						<div className="w-full mt-10 ">
							<div className="w-[90%] mx-auto flex flex-auto gap-6 flex-wrap justify-evenly">
								{allPokemon.slice(649, 721).map((pokemon, index) => {
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
														}}
														className="w-[160px] h-[140px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300 bg-white bg-opacity-85"
													></div>
													<div className="w-[160px] h-[70px] border-2 border-zinc-800 mx-auto mt-3 format ps-2">
														<h2 className="m-0"># {pokemon.id}</h2>
														<h3>{pokemon.name.english}</h3>
													</div>
												</div>
											</div>
										</>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Alola-Dex">
						<div className="w-full mt-10 ">
							<div className="w-[90%] mx-auto flex flex-auto gap-6 flex-wrap justify-evenly">
								{allPokemon.slice(721, 809).map((pokemon, index) => {
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
														}}
														className="w-[160px] h-[140px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300 bg-white bg-opacity-85"
													></div>
													<div className="w-[160px] h-[70px] border-2 border-zinc-800 mx-auto mt-3 format ps-2">
														<h2 className="m-0"># {pokemon.id}</h2>
														<h3>{pokemon.name.english}</h3>
													</div>
												</div>
											</div>
										</>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
				</Tabs>
				<button>top</button>
			</div>
			{/* <div className="w-full mt-10 ">
				<div className="w-[90%] mx-auto flex flex-auto gap-6 flex-wrap justify-evenly">
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
											}}
											className="w-[160px] h-[140px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300 bg-white bg-opacity-85"
										></div>
										<div className="w-[160px] h-[70px] border-2 border-zinc-800 mx-auto mt-3 format ps-2">
											<h2 className="m-0"># {pokemon.id}</h2>
											<h3>{pokemon.name.english}</h3>
										</div>
									</div>
								</div>
							</>
						);
					})}
				</div>
			</div> */}
		</>
	);
}

export default AllPokemon;
