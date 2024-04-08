const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

//pokemon json file
let pokemonData = require('./services/Pokemon.json');

//Get all Pokemon
app.get('/pokemon', (req, res) => {
	try {
		if (pokemonData === '') {
			return res.status(404).json({ message: 'No Pokemon found' });
		}
		res.json(pokemonData);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get Pokemon by id
app.get('/pokemon/:id', (req, res) => {
	const { id } = req.params;

	try {
		const pokemon = pokemonData.find((pokemon) => {
			if (pokemon.id === +id) {
				return res.json(pokemon);
			}
		});
		if (!pokemon) {
			return res.status(404).json({ message: 'Pokemon not found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
//Get Pokemon by id and show info
app.get('/pokemon/:id/:info', (req, res) => {
	const { id, info } = req.params;
	try {
		const pokemon = pokemonData.find((pokemon) => {
			return pokemon.id === +id;
		});
		if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' });
		res.json(pokemon[info]);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
