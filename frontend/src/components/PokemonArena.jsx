import PokemonLogo from '../assets/pokemonLogo.png';
import arena from '../assets/arena.png';

function PokemonArena() {
	return (
		<>
			<section className=" dark:bg-sky-950 pb-20">
				<div className="relative w-[89%] mx-auto flex">
					<div>
						<img
							src={PokemonLogo}
							alt=""
							width={400}
							className="absolute top-0 left-40 z-10"
						/>
						<img
							src={arena}
							alt=""
							width={200}
							className="absolute top-[120px] left-[265px] z-0"
						/>
					</div>
				</div>
				<div className="flex gap-10">
					<div className="mt-[350px]  w-[800px] ms-6 border-zinc-800 border-2 rounded-2xl shadow-xl flex items-center gap-3 dark:bg-gray-900 dark:border-2 dark:border-zinc-900">
						<img
							src="https://cdn.businessinsider.de/wp-content/uploads/2019/06/1s-eno4yd9kfag2k8vytumg.jpeg"
							alt=""
							width={400}
							className="rounded-s-2xl h-full"
						/>
						<div className="format">
							<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								Welcome to the Pokemon Arena
							</h5>
							<p className="font-normal text-gray-700 dark:text-gray-400 pe-8">
								Here you can test your skills! Continue on the right and follow
								the instructions.
							</p>
						</div>
					</div>
					<div className="h-[600px] w-[400px] mt-10 border-2 border-zinc-800 rounded-2xl shadow-2xl dark:bg-gray-900 dark:border-2 dark:border-zinc-900"></div>
				</div>
			</section>
		</>
	);
}

export default PokemonArena;
