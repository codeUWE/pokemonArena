import './App.css';
import { Routes, Route } from 'react-router-dom';

//components
import Nav from './components/Nav';
import Homepage from './components/Homepage';
import AllPokemon from './components/AllPokemon';
import FooterPokemon from './components/Footer';
import PokemonArena from './components/PokemonArena';
import SinglePokemon from './components/SinglePokemon';

function App() {
	return (
		<>
			<Nav />
			<main>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/pokemon" element={<AllPokemon />} />
					<Route path="/pokemon/:id" element={<SinglePokemon />} />
					<Route path="/pokemon/:id/:info" element={<SinglePokemon />} />
					<Route path="/arena" element={<PokemonArena />} />
				</Routes>
			</main>
			<FooterPokemon />
		</>
	);
}

export default App;
