import { useNavigate } from 'react-router-dom';

//assets images
import PokemonLogo from '../assets/pokemonLogo.png';
import iconArceus from '../assets/iconArceus.png';
import iconCelebi from '../assets/iconCelebi.png';
import iconDeoxys from '../assets/iconDeoxys.png';
import iconMew from '../assets/iconMew.png';
import glurak from '../assets/glurak.png';
import pikachu from '../assets/pikachu.png';
import stern from '../assets/stern.png';
import grassBackground from '../assets/grassBackground.png';

import { Card, Button } from 'flowbite-react';

function Homepage() {
	const navigate = useNavigate();

	return (
		<>
			<div className="relative flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 via-orange-100 to-yellow-100">
				<img
					src={glurak}
					alt=""
					className="absolute top-[10px] right-0 z-10"
					width={500}
				/>
				<img
					src={pikachu}
					alt=""
					className="absolute top-96 left-0 z-10"
					width={300}
				/>
				<div className="w-full flex justify-center items-center">
					<div className="w-[400px] h-[600px] bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-300 rounded-xl flex flex-col items-center justify-center shadow-zinc-700 shadow-md m-4 z-10 ">
						<div
							className={`flex flex-col items-center bg-gradient-to-b from-violet-300 via-fuchsia-200 to-violet-300 `}
							style={{
								width: '370px',
								height: '570px',
								borderRadius: '0.375rem',
							}}
						>
							<div>
								<div className="flex justify-between items-center mt-2">
									<h3 className="bg-gray-50 bg-opacity-85 px-2 rounded-3xl">
										1000000 HP
									</h3>
									<div className="flex gap-1">
										<div
											className={`w-6 h-6 p-1 rounded-full bg-gradient-to-b from-red-600 via-red-400 to-red-600 flex justify-center items-center border-2 border-black shadow-xl`}
										>
											<img src={stern} alt="Star Icon" width={18} />
										</div>
										<div
											className={`w-6 h-6 p-1 rounded-full bg-gradient-to-b from-green-600 via-green-400 to-green-600 flex justify-center items-center border-2 border-black shadow-xl`}
										>
											<img src={stern} alt="Star Icon" width={18} />
										</div>
										<div
											className={`w-6 h-6 p-1 rounded-full bg-gradient-to-b from-blue-600 via-blue-400 to-blue-600 flex justify-center items-center border-2 border-black shadow-xl`}
										>
											<img src={stern} alt="Star Icon" width={18} />
										</div>
										<div
											className={`w-6 h-6 p-1 rounded-full bg-gradient-to-b from-violet-600 via-violet-400 to-violet-600 flex justify-center items-center border-2 border-black shadow-xl`}
										>
											<img src={stern} alt="Star Icon" width={18} />
										</div>
										<div
											className={`w-6 h-6 p-1 rounded-full bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-500 flex justify-center items-center border-2 border-black shadow-xl`}
										>
											<img src={stern} alt="Star Icon" width={18} />
										</div>
									</div>
								</div>
								<div className="relative w-[340px] h-[300px] rounded-sm mx-auto mt-2 bg-cover bg-center border-[3.5px] border-gray-300 bg-blue-500 items-center overflow-hidden">
									<img
										src={PokemonLogo}
										alt="Pokemon Logo"
										className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
									/>
									<img
										src="https://tmpfiles.nohat.cc/m2i8N4N4K9i8K9d3.png"
										alt="Decorative Background"
										className="absolute top-24 left-[75px] w-48 h-48 object-cover z-0"
									/>
								</div>
							</div>

							<div className=" relative w-[340px] h-[170px] border-2 border-zinc-800 mx-auto mt-3 flex justify-center items-center">
								<img
									src={iconMew}
									alt="Mew"
									className="absolute top-0 left-0"
									width={60}
								/>
								<img
									src={iconArceus}
									alt="Arceus"
									className="absolute bottom-0 left-0"
									width={50}
								/>
								<img
									src={iconCelebi}
									alt="Celebi"
									className="absolute top-0 right-0"
									width={60}
								/>
								<img
									src={iconDeoxys}
									alt="Deoxys"
									className="absolute bottom-0 right-0"
									width={50}
								/>
								<h3 className="text-2xl font-bold">
									Gotta catch &apos;em all!
								</h3>
							</div>
						</div>
					</div>
					<main className="z-20">
						<div>
							<Card className="w-[400px] h-[400px] z-40 border-2">
								<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									Welcome to <br /> this Pokemon Fanpage.
								</h5>
								<p className="font-normal text-gray-700 dark:text-gray-400 mt-4">
									You can view important information about the first{' '}
									<span className="font-bold text-red-700 dark:text-purple-400">
										809
									</span>{' '}
									Pokemon over here! Although you can visit the Pokemon Arena to
									battle other Pokemon with the Pokemon of your choice! Just
									click on the buttons bellow.
								</p>

								<Button
									pill
									className="bg-red-700 mt-8"
									onClick={() => navigate('/arena')}
								>
									Visit Arena
								</Button>
								<Button
									pill
									className="bg-blue-700 mt-3"
									onClick={() => navigate('/pokemon')}
								>
									See Pokemon
								</Button>
							</Card>
						</div>
					</main>
				</div>
				<div>
					<img
						src={grassBackground}
						alt=""
						className="absolute top-[150px] left-0 z-0"
					/>
				</div>
			</div>
		</>
	);
}

export default Homepage;
