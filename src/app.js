const fs = require('fs');
const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

const pokemons = JSON.parse(fs.readFileSync('../pokemons.json'));

app.get('/pokemons', (req, res) => {
    const name = req.query.name;
    let filteredPokemons;
    if (name) {
        filteredPokemons = pokemons.filter(pokemon => pokemon.name.indexOf(name) > -1);
    } else {
        filteredPokemons = pokemons;
    }
    res.status(200).json({
        status: 'success',
        results: pokemons.length,
        data: {
            pokemons: filteredPokemons
        }
    });
});

app.get('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(item => item.id === id);

    if (!pokemon) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid id'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            pokemon
        }
    });
});

app.get('/caughtPokemons', (req, res) => {
    const caughtPokemons = pokemons.filter(pokemon => pokemon.isCaught);

    res.status(200).json({
        status: 'success',
        data: {
            pokemons: caughtPokemons
        }
    });
});

app.post('/pokemons', (req, res) => {
    const newId = pokemons[pokemons.length - 1].id + 1;
    const newPokemon = {
        name: '',
        damage: '',
        isCaught: '',
        createdAt: '',
        ...req.body,
        id: newId
    };
    pokemons.push(newPokemon);

    res.status(201).json({
        status: 'success',
        data: {
            pokemon: newPokemon
        }
    })
});

app.patch('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(item => item.id === id);

    if (!pokemon) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid id'
        });
    }

    const index = pokemons.indexOf(pokemon);
    const newPokemon = {
        ...pokemon,
        ...req.body
    };
    pokemons.splice(index, 1, newPokemon);

    res.status(200).json({
        status: 'success',
        data: {
            pokemon: newPokemon
        }
    })
});

app.patch('/catchPokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(item => item.id === id);

    if (!pokemon) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid id'
        });
    }

    pokemon.isCaught = true;

    res.status(200).json({
        status: 'success',
        data: {
            pokemon
        }
    })
});

app.delete('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(item => item.id === id);

    if (!pokemon) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid id'
        });
    }
    const index = pokemons.indexOf(pokemon);
    pokemons.splice(index, 1);
    res.status(204).json({
        status: 'success',
        data: null
    });
});

app.listen(port, () => console.log(`app is running on port ${port}`));