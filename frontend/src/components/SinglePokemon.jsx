import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pokemonTypes } from '../services/pokemonCardsService';
import {
	getPokemonById,
	getPokemonByIdWithInfo,
} from '../services/backendRequests';

//assets
import Star from '../assets/stern.png';
import { Breadcrumb, Button } from 'flowbite-react';

function SinglePokemon() {
	const navigate = useNavigate();
	const { id, info } = useParams();
	const [singlePokemon, setSinglePokemon] = useState(null);

	useEffect(() => {
		getPokemonById(id)
			.then((data) => setSinglePokemon(data))
			.catch((err) => console.log(err));
		getPokemonByIdWithInfo(info)
			.then((data) => setSinglePokemon(data))
			.catch((err) => console.log(err));
	}, [id, info]);

	const getCardBackground = () => {
		if (!singlePokemon || !singlePokemon.type) return '';
		return pokemonTypes[singlePokemon.type[0]] || '';
	};

	const getStarBackground = () => {
		if (!singlePokemon || !singlePokemon.type) return '';
		return pokemonTypes[singlePokemon.type[1]] || '';
	};

	const pokedexRegion = () => {
		if (singlePokemon.id >= 1 && singlePokemon.id <= 151) {
			return 'Kanto-Pokedex';
		} else if (singlePokemon.id >= 152 && singlePokemon.id <= 251) {
			return 'Johto-Pokedex';
		} else if (singlePokemon.id >= 252 && singlePokemon.id <= 386) {
			return 'Hoenn-Pokedex';
		} else if (singlePokemon.id >= 387 && singlePokemon.id <= 493) {
			return 'Sinnoh-Pokedex';
		} else if (singlePokemon.id >= 494 && singlePokemon.id <= 649) {
			return 'Einall-Pokedex';
		} else if (singlePokemon.id >= 650 && singlePokemon.id <= 721) {
			return 'Kalos-Pokedex';
		} else if (singlePokemon.id >= 722 && singlePokemon.id <= 809) {
			return 'Alola-Pokedex';
		} else {
			return 'Unknown Region';
		}
	};

	return (
		<>
			<div className="dark:bg-sky-950">
				<div className="w-1/2 mx-auto flex justify-center">
					<Breadcrumb
						aria-label="Default breadcrumb example"
						className="cursor-pointer rounded-2xl px-6 py-2 border-2 mt-4"
					>
						<Breadcrumb.Item
							onClick={() => navigate('/')}
							className="dark:text-white"
						>
							Home
						</Breadcrumb.Item>
						<Breadcrumb.Item
							onClick={() => navigate('/pokemon')}
							className="dark:text-white"
						>
							All Pokemon
						</Breadcrumb.Item>
						<Breadcrumb.Item
							onClick={() => navigate(`/pokemon/${singlePokemon?.id} `)}
							className="dark:text-white"
						>
							<span className="text-blue-700 dark:text-red-500 font-bold">
								{singlePokemon?.name?.english}
							</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className="w-full flex justify-center items-center">
					<div className="w-[400px] h-[600px] bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-300  rounded-xl flex flex-col items-center justify-center shadow-zinc-700 shadow-xl m-12 ">
						<div
							className={`flex flex-col items-center ${getCardBackground()}`}
							style={{
								width: '370px',
								height: '570px',
								borderRadius: '0.375rem',
							}}
						>
							{singlePokemon?.id && (
								<div>
									<div className="flex justify-between items-center mt-2">
										<div className="format">
											<h3>{singlePokemon.name.english}</h3>
										</div>
										<div className="flex gap-2">
											<h3 className="bg-gray-50 bg-opacity-85 px-2  rounded-3xl">
												{singlePokemon.base.HP} HP
											</h3>
											<div
												className={`w-6 h-6 p-1 rounded-full ${getCardBackground()} flex justify-center items-center border-2 border-black shadow-xl`}
											>
												<img src={Star} alt="Star Icon" width={18} />
											</div>
											{singlePokemon.type[1] ? (
												<div
													className={`w-6 h-6 p-1 rounded-full ${getStarBackground()} flex justify-center items-center border-2 border-black shadow-md`}
												>
													<img src={Star} alt="Star Icon" width={18} />
												</div>
											) : (
												''
											)}
										</div>
									</div>
									<div
										style={{
											backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${singlePokemon.id}.png)`,
										}}
										className="w-[340px] h-[300px] rounded-sm mx-auto mt-2 bg-cover bg-center border-[3.5px] border-gray-300 bg-white bg-opacity-85"
									></div>
								</div>
							)}

							<div className="w-[340px] h-[170px] border-2 border-zinc-800 mx-auto mt-3 format ps-2 flex flex-col justify-between items-center p-4">
								<h2 className="m-0 ">
									#{singlePokemon?.id ?? 'Loading...'} from{' '}
									{singlePokemon?.id && pokedexRegion()}
								</h2>
								<h4> Click Buttons for detailed information</h4>
								<div className="flex space-x-2">
									<Button
										onClick={() =>
											navigate(`/pokemon/${singlePokemon.id}/name`)
										}
										className="bg-zinc-800 text-orange-200 px-4 rounded-3xl border-none"
									>
										Name
									</Button>
									<Button
										onClick={() =>
											navigate(`/pokemon/${singlePokemon.id}/type`)
										}
										className="bg-zinc-800 text-pink-300 px-4 rounded-3xl border-none"
									>
										Type
									</Button>
									<Button
										onClick={() =>
											navigate(`/pokemon/${singlePokemon.id}/base`)
										}
										className="bg-zinc-800 text-blue-300  px-4 rounded-3xl border-none"
									>
										Base
									</Button>
								</div>
							</div>
						</div>
					</div>
					{!info && (
						<>
							<div className="w-[400px] h-80 flex flex-col items-center gap-5 p-4 format">
								<h2 className="mt-20 dark:text-gray-300">
									Hello User, click on the buttons, <br /> to display different
									information about{' '}
									<span className="text-blue-700 dark:text-red-500">
										{singlePokemon?.name.english}
									</span>
								</h2>
							</div>
						</>
					)}
					{info === 'name' && singlePokemon && (
						<>
							<div className="flex flex-col items-center gap-5">
								<div className="w-[400px] h-80 bg-gray-200 rounded-3xl format p-6 flex flex-col justify-around shadow-xl">
									<h2>
										{singlePokemon.name.english}&rsquo;s Name in different
										languages:
									</h2>
									<div className="px-4 py-2 rounded-xl bg-orange-300 bg-opacity-80">
										<h3>English: {singlePokemon.name.english}</h3>
										<h3>Japanese: {singlePokemon.name.japanese}</h3>
										<h3>Chinese: {singlePokemon.name.chinese}</h3>
										<h3>French: {singlePokemon.name.french}</h3>
									</div>
								</div>
								<Button
									pill
									className="mt-2 bg-blue-700"
									onClick={() => navigate(`/pokemon/${singlePokemon?.id} `)}
								>
									Show Card only
								</Button>
							</div>
						</>
					)}
					{info === 'type' && singlePokemon && (
						<>
							<div className="flex flex-col items-center gap-5">
								<div className="w-[400px] h-80 bg-gray-200 rounded-3xl format p-6 flex flex-col justify-around shadow-xl">
									<h2>Types of {singlePokemon.name.english}:</h2>
									<div className="mt-8">
										<div className="bg-pink-300 bg-opacity-80 px-4 py-2 rounded-xl">
											<div className="flex gap-2 items-center">
												<div
													className={`w-6 h-6 p-1 rounded-full ${getCardBackground()} flex justify-center items-center border-2 border-black shadow-xl`}
												>
													<img src={Star} alt="Star Icon" width={18} />
												</div>

												<h3 className="mt-2">{singlePokemon.type[0]}</h3>
											</div>
											{singlePokemon.type[1] ? (
												<div className="flex gap-2 items-center">
													<div
														className={`w-6 h-6 p-1 rounded-full ${getStarBackground()} flex justify-center items-center border-2 border-black shadow-xl`}
													>
														<img src={Star} alt="Star Icon" width={18} />
													</div>

													<h3 className="mt-2">{singlePokemon.type[1]}</h3>
												</div>
											) : (
												''
											)}
										</div>
									</div>
								</div>
								<Button
									pill
									className="mt-2 bg-blue-700"
									onClick={() => navigate(`/pokemon/${singlePokemon?.id} `)}
								>
									Show Card only
								</Button>
							</div>
						</>
					)}
					{info === 'base' && singlePokemon && (
						<>
							<div className="flex flex-col items-center gap-5">
								<div className="w-[400px] h-80 bg-gray-200 rounded-3xl format p-6 flex flex-col justify-around shadow-xl">
									<h2>Base Attributes:</h2>
									<div className="bg-blue-300 bg-opacity-80 rounded-xl px-4 py-2">
										<h4>HP: {singlePokemon.base.HP}</h4>
										<h4>Attack: {singlePokemon.base.Attack}</h4>
										<h4>Defense: {singlePokemon.base.Defense}</h4>
										<h4>Sp. Attack: {singlePokemon.base['Sp. Attack']}</h4>
										<h4>Sp. Defense: {singlePokemon.base['Sp. Defense']}</h4>
										<h4>Speed: {singlePokemon.base.Speed}</h4>
									</div>
								</div>
								<Button
									pill
									className="mt-2 bg-blue-700"
									onClick={() => navigate(`/pokemon/${singlePokemon?.id} `)}
								>
									Show Card only
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default SinglePokemon;
