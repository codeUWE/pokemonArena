import { useState, useEffect } from 'react';
import { getKantoPokemon } from '../services/backendRequests';

function Cards() {
	const [firstPokemon, setFirstPokemon] = useState([]);

	useEffect(() => {
		getKantoPokemon()
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			<div className="w-full h-screen bg-zinc-700">
				<div className="p-10">
					<div className="w-[200px] h-[300px] bg-gradient-to-b from-gray-400 via-gray-300 to-gray-400 rounded-md flex items-center justify-center shadow-zinc-700 shadow-xl">
						<div className="w-[180px] h-[280px] bg-gradient-to-b from-amber-400 via-yellow-200 to-amber-400 rounded-md">
							<div
								style={{
									backgroundImage: `url(https://i.etsystatic.com/46611762/r/il/323a26/5653417372/il_1140xN.5653417372_12rs.jpg)`,
								}}
								className="w-[160px] h-[140px] rounded-sm mx-auto mt-4 bg-cover bg-center border-[3.5px] border-gray-300"
							></div>
							<div className="w-[160px] h-[70px] border-2 border-black mx-auto mt-3"></div>
							<button
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Default
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Cards;
