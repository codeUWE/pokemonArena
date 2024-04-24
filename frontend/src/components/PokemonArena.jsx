import { useState, useEffect } from 'react';
import { getAllPokemon } from '../services/backendRequests';
import { useNavigate } from 'react-router-dom';

import PokemonLogo from '../assets/pokemonLogo.png';
import arena from '../assets/arena.png';
import { Avatar, Button, Tooltip } from 'flowbite-react';

function PokemonArena() {
	const [allPokemon, setAllPokemon] = useState([]);
	const [selectedTrainer, setSelectedTrainer] = useState(null);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [opponentTrainer, setOpponentTrainer] = useState(null);
	const [opponentPokemon, setOpponentPokemon] = useState(null);
	const [difficulty, setDifficulty] = useState(null);
	const [battleStarted, setBattleStarted] = useState(false);
	const [battleLog, setBattleLog] = useState([]);
	const [gameOver, setGameOver] = useState(false);

	useEffect(() => {
		getAllPokemon()
			.then((data) => setAllPokemon(data))
			.catch((error) => console.log(error));
	}, []);

	const isReadyToBattle = selectedTrainer && selectedPokemon && difficulty;

	const randomOpponentTrainer = () => {
		const trainerNames = ['Ash', 'Janine', 'Lance', 'May-e'];
		const randomNumber = Math.floor(Math.random() * trainerNames.length);
		setOpponentTrainer(trainerNames[randomNumber]);
	};

	const randomOpponentPokemon = () => {
		let filteredPokemon = [];
		if (allPokemon.length > 0) {
			switch (difficulty) {
				case 'Easy':
					filteredPokemon = allPokemon.filter(
						(pokemon) => pokemon.base.HP <= 50
					);
					break;
				case 'Medium':
					filteredPokemon = allPokemon.filter(
						(pokemon) => pokemon.base.HP > 50 && pokemon.base.HP <= 79
					);
					break;
				case 'Hard':
					filteredPokemon = allPokemon.filter(
						(pokemon) => pokemon.base.HP >= 80
					);
					break;
				default:
					return; // Beendet die Funktion frühzeitig, falls keine Schwierigkeit ausgewählt ist
			}

			if (filteredPokemon.length > 0) {
				const randomIndex = Math.floor(Math.random() * filteredPokemon.length);
				const chosenPokemon = filteredPokemon[randomIndex];

				setOpponentPokemon({
					...chosenPokemon,
					currentHP: chosenPokemon.base.HP,
				});
			}
		}
	};

	const startBattle = () => {
		if (isReadyToBattle) {
			randomOpponentTrainer();
			randomOpponentPokemon();

			setSelectedPokemon((prev) => ({
				...prev,
				currentHP: prev.base.HP,
			}));

			setBattleStarted(true);
			setBattleLog(['The battle starts!']);
			setGameOver(false);
		}
	};

	// Battle Log hinzufügen und Spielende überprüfen
	const addToBattleLog = (message) => {
		setBattleLog((oldLog) => [...oldLog, message]);
		if (selectedPokemon.currentHP <= 0 || opponentPokemon.currentHP <= 0) {
			setGameOver(true);
			setBattleLog((oldLog) => [...oldLog, 'Game Over!']);
		}
	};

	function computerTurn() {
		const actionChoice = Math.random();
		if (actionChoice < 0.33) {
			// Computer führt einen normalen Angriff aus
			computerAttack();
		} else if (actionChoice < 0.66) {
			// Computer führt eine Verteidigung aus
			computerDefend();
		} else {
			// Computer führt einen Spezialangriff aus
			computerSpecialAttack();
		}
	}

	function computerAttack() {
		const hitChance = Math.random();
		if (hitChance < 0.8) {
			const damage = Math.max(
				1,
				opponentPokemon.base.Attack - selectedPokemon.base.Defense
			);
			const newHP = Math.max(0, selectedPokemon.currentHP - damage);
			setSelectedPokemon({ ...selectedPokemon, currentHP: newHP });
			addToBattleLog(`Opponent attacks and deals ${damage} damage.`);
		} else {
			addToBattleLog('Opponent attacks and misses.');
		}
	}

	function computerDefend() {
		// Logik für Verteidigung
		addToBattleLog('Opponent defends.');
	}

	function computerSpecialAttack() {
		// Sicherstellen, dass die benötigten Daten vorhanden sind
		if (
			!opponentPokemon ||
			!opponentPokemon.base ||
			!selectedPokemon ||
			!selectedPokemon.base
		) {
			console.log('Data missing for special attack calculation');
			addToBattleLog('Calculation error: Data missing for special attack.');
			return;
		}

		// Prüfen, ob die benötigten Werte gültige Zahlen sind
		if (
			typeof opponentPokemon.base.SpecialAttack !== 'number' ||
			typeof selectedPokemon.base.Defense !== 'number'
		) {
			console.log('Invalid data types:', {
				opponentSpecialAttack: opponentPokemon.base.SpecialAttack,
				selectedDefense: selectedPokemon.base.Defense,
			});

			addToBattleLog(
				'Calculation error: Invalid data types for special attack.'
			);
			return;
		}

		// Schadensberechnung
		const damage = Math.max(
			0,
			2 * opponentPokemon.base.SpecialAttack - selectedPokemon.base.Defense
		);
		if (!isNaN(damage)) {
			const newHP = Math.max(0, selectedPokemon.currentHP - damage);
			setSelectedPokemon({ ...selectedPokemon, currentHP: newHP });
			addToBattleLog(
				`Opponent uses a special attack and deals ${damage} damage.`
			);
		} else {
			addToBattleLog('Calculation error in special attack by opponent.');
		}
	}

	const handleAttack = () => {
		const critChance = Math.random();
		const hitChance = Math.random();
		const criticalHitMultiplier = critChance < 0.05 ? 1.2 : 1;
		if (hitChance < 0.8) {
			const baseDamage =
				selectedPokemon.base.Attack + (selectedPokemon.nextAttackBonus || 0);
			const damage = Math.max(
				1,
				baseDamage * criticalHitMultiplier - opponentPokemon.base.Defense
			);
			const newHP = Math.max(0, opponentPokemon.currentHP - damage);
			setOpponentPokemon({ ...opponentPokemon, currentHP: newHP });
			addToBattleLog(`${selectedTrainer} attacks and deals ${damage} damage.`);
		} else {
			addToBattleLog(`${selectedTrainer} attacks and misses.`);
		}
		selectedPokemon.nextAttackBonus = 0;
		computerTurn();
	};

	const handleSpecialAttack = () => {
		const hitChance = Math.random();
		if (hitChance < 0.2) {
			const baseDamage = 2 * selectedPokemon.base.SpecialAttack;
			const damage = Math.max(0, baseDamage - opponentPokemon.base.Defense);
			const newHP = Math.max(0, opponentPokemon.currentHP - damage);
			setOpponentPokemon({ ...opponentPokemon, currentHP: newHP });
			addToBattleLog(
				`${selectedTrainer} uses a special attack and deals ${damage} damage.`
			);
		} else {
			addToBattleLog(`${selectedTrainer}'s special attack missed.`);
		}
		computerTurn();
	};

	const handleDefense = () => {
		const defenseSuccess = Math.random() < 0.8;
		if (defenseSuccess) {
			selectedPokemon.nextAttackBonus += 0.05 * selectedPokemon.base.Attack;
			addToBattleLog(
				`${selectedTrainer} defends successfully and boosts next attack.`
			);
		} else {
			const newHP = Math.max(0, selectedPokemon.currentHP - 3);
			setSelectedPokemon({ ...selectedPokemon, currentHP: newHP });
			addToBattleLog(`${selectedTrainer} failed to defend and takes 3 damage.`);
		}
		computerTurn();
	};

	const handleSpecialDefense = () => {
		const defenseSuccess = Math.random() < 0.8;
		if (defenseSuccess) {
			selectedPokemon.nextAttackMultiplier = 2;
			addToBattleLog(`${selectedTrainer} uses special defense successfully.`);
		} else {
			const newHP = Math.max(0, selectedPokemon.currentHP - 8);
			setSelectedPokemon({ ...selectedPokemon, currentHP: newHP });
			addToBattleLog(
				`${selectedTrainer}'s special defense failed and takes 8 damage.`
			);
		}
		computerTurn();
	};

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
					{!battleStarted ? (
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
									Here you can test your skills! Continue on the right and
									follow the instructions.
								</p>
							</div>
						</div>
					) : (
						<div className="mt-[350px]  w-[800px] ms-6 border-zinc-800 border-2 rounded-2xl shadow-xl flex flex-col items-center gap-3 dark:bg-gray-900 dark:border-2 dark:border-zinc-900 bg-[url('https://img.freepik.com/free-vector/versus-vs-screen-background-comic-style_1017-23760.jpg?w=1380&t=st=1713375974~exp=1713376574~hmac=f283edc66c6e34f3ace54f371190bf1483b69d964025d6119063c2e024373d60')] bg-cover ">
							<div className="flex justify-center items-center gap-[380px]">
								<div>
									<h3>
										{selectedPokemon.name.english} - HP:{' '}
										{selectedPokemon.currentHP}/{selectedPokemon.base.HP}
									</h3>
									<img
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
										alt={selectedPokemon?.name?.english}
										width={200}
									/>
								</div>
								<div>
									<h3>
										{opponentPokemon.name.english} - HP:
										{opponentPokemon.currentHP}/
										{opponentPokemon.base
											? opponentPokemon.base.HP
											: 'Loading...'}
									</h3>

									<img
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${opponentPokemon?.id}.png`}
										alt={opponentPokemon?.name?.english}
										width={200}
									/>
								</div>
							</div>

							<div className="flex gap-36 mb-5">
								<div className="flex flex-wrap w-[300px] gap-2 justify-center items-center space-y-4 self-start">
									<Button
										onClick={handleAttack}
										className="w-32 bg-red-600 mt-4"
									>
										Attack
									</Button>
									<Button
										onClick={handleSpecialAttack}
										className="w-32 bg-blue-600"
									>
										Spc. Attack
									</Button>
									<Button
										color="green"
										onClick={handleDefense}
										className="w-32 bg-green-600"
									>
										Defense
									</Button>
									<Button
										color="purple"
										onClick={handleSpecialDefense}
										className="w-32 bg-purple-600"
									>
										Spc. Defense
									</Button>
								</div>
								<div className="bg-white w-80 h-20 overflow-scroll text-center self-end rounded-xl">
									{battleLog.map((log, index) => (
										<div key={index}>{log}</div>
									))}
								</div>
							</div>
						</div>
					)}

					{!battleStarted ? (
						<div className="h-[650px] w-[400px] mt-10 border-2 border-zinc-800 rounded-2xl shadow-2xl dark:bg-gray-900 dark:border-2 dark:border-zinc-900 p-4">
							<h2 className="text-xl font-semibold self-start">
								1. Select a Trainer you want to battle:
							</h2>
							<div className="flex flex-wrap gap-5 p-2 justify-center items-center mt-1">
								<div className="flex  justify-center items-center">
									{['Ash', 'Janine', 'Lance', 'May-e'].map((trainer) => (
										<div
											key={trainer}
											className="flex flex-col justify-center items-center"
										>
											<Avatar
												img={`https://play.pokemonshowdown.com/sprites/trainers/${trainer.toLowerCase()}.png`}
												onClick={() => setSelectedTrainer(trainer)}
												className={`cursor-pointer rounded-full p-2 m-1 shadow-md ${
													selectedTrainer === trainer
														? 'bg-orange-500 '
														: 'bg-gray-300'
												}`}
											/>
											<h3>{trainer}</h3>
										</div>
									))}
								</div>
							</div>
							<h2 className="text-xl font-semibold self-start">
								2. Select a Pokemon for the battle:
							</h2>
							<div className="flex flex-wrap gap-2 p-2 justify-center items-center mt-1 h-48 overflow-scroll">
								{allPokemon.map((pokemon) => (
									<Tooltip
										key={pokemon.id}
										className="bg-black w-20"
										content={`
												HP: ${pokemon.base.HP}
												Att.: ${pokemon.base.Attack}
												Def.: ${pokemon.base.Defense}
											`}
									>
										<Avatar
											img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
											onClick={() => setSelectedPokemon(pokemon)}
											className={`cursor-pointer rounded-full shadow-md p-1  ${
												selectedPokemon === pokemon
													? 'bg-orange-500'
													: 'bg-gray-300'
											}`}
										/>
									</Tooltip>
								))}
							</div>
							<h2 className="text-xl font-semibold self-start mt-3">
								3. Select a difficulty for the battle:
							</h2>
							<div className="flex  gap-3 p-2 justify-center items-center mt-1 overflow-scroll">
								{['Easy', 'Medium', 'Hard'].map((level) => (
									<Button
										key={level}
										onClick={() => setDifficulty(level)}
										className={`text-white px-4 rounded-3xl border-none ${
											difficulty === level ? 'bg-orange-500 ' : 'bg-gray-400'
										}`}
									>
										{level}
									</Button>
								))}
							</div>
							<h2 className="text-xl font-semibold self-start">
								4. Click Button below if you are ready:
							</h2>
							<div className="flex flex-col gap-5 p-2 justify-center items-center mt-1 overflow-scroll">
								{!isReadyToBattle ? (
									<h3 className="text-sm font-bold">
										Choose Trainer, Pokemon and Difficulty to start!
									</h3>
								) : (
									<h3 className="text-blue-600 font-bold">
										Good choice! Are you ready for a Battle?
									</h3>
								)}
								<Button
									pill
									className={` text-black   ${
										isReadyToBattle
											? 'bg-orange-500 animate-bounce cursor-pointer'
											: 'bg-gray-400'
									}`}
									disabled={!isReadyToBattle}
									onClick={startBattle}
								>
									Start Battling
								</Button>
							</div>
						</div>
					) : (
						<div className="h-[650px] w-[400px] mt-10 border-2 border-zinc-800 bg-gray-300 rounded-2xl shadow-2xl dark:bg-gray-900 dark:border-2 dark:border-zinc-900 p-8 flex justify-center items-center">
							<div>
								<div className="flex justify-center gap-8">
									<div className="flex flex-col h-full justify-center items-center">
										<h2 className="text-xl font-bold">You</h2>
										<img
											src={`https://play.pokemonshowdown.com/sprites/trainers/${selectedTrainer.toLowerCase()}.png`}
											alt=""
										/>
										<h3 className="font-semibold text-xl">{selectedTrainer}</h3>
										<Tooltip
											className="bg-black w-20"
											placement="left"
											content={`
												HP: ${selectedPokemon.base.HP}
												Att.: ${selectedPokemon.base.Attack}
												Def.: ${selectedPokemon.base.Defense}
											`}
										>
											<img
												src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
												alt={selectedPokemon.name.english}
												width={90}
											/>
										</Tooltip>
										<h3 className="font-semibold text-xl">
											{selectedPokemon.name.english}
										</h3>
									</div>
									<div className="flex flex-col justify-center items-center">
										<h1>VS</h1>
									</div>
									<div className="flex flex-col justify-center items-center">
										<h2 className="text-xl font-bold">Opponent</h2>
										<img
											src={`https://play.pokemonshowdown.com/sprites/trainers/${opponentTrainer.toLowerCase()}.png`}
											alt=""
										/>
										<h3 className="font-semibold text-xl">{selectedTrainer}</h3>
										<Tooltip
											className="bg-black w-20"
											placement="right"
											content={`
												HP: ${opponentPokemon.base?.HP}
												Att.: ${opponentPokemon.base?.Attack}
												Def.: ${opponentPokemon.base?.Defense}
											`}
										>
											<img
												src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${opponentPokemon?.id}.png`}
												alt={opponentPokemon?.name?.english}
												width={90}
											/>
										</Tooltip>
										<h3 className="font-semibold text-xl">
											{opponentPokemon?.name?.english}
										</h3>
									</div>
								</div>
								<h3 className="font-neutral text-2xl text-center mt-10">
									You choosed level: {difficulty}
								</h3>
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	);
}

export default PokemonArena;
