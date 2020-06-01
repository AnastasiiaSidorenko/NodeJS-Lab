const Pokemon = require('../schemas/pokemon');

function getAllPokemons(req, res) {
    const { name } = req.query;
    let query;
    if (name) {
        query = Pokemon.find({ name });
    } else {
        query = Pokemon.find({});
    }
    query.exec((err, pokemons) => {
        if (err) {
            res.status(500).json({
                status: 'Request failed',
                message: err,
            });
        }
        res.status(200).json({
            status: 'success',
            results: pokemons.length,
            data: {
                pokemons,
            },
        });
    });
}

function getPokemonById(req, res) {
    const { id } = req.params;
    const query = Pokemon.findById(id);
    query.exec((err, pokemon) => {
        if (err) {
            return res.status(500).json({
                status: 'Request failed',
                message: err,
            });
        }
        if (!pokemon) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid id',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                pokemon,
            },
        });
    });
}

function addPokemon(req, res) {
    const newPokemon = {
        name: '',
        damage: '',
        isCaught: '',
        createdAt: '',
        id: null,
        ...req.body,
    };
    Pokemon.create(newPokemon, (err, pokemon) => {
        if (err) {
            return res.status(500).json({
                status: 'Request failed',
                message: err,
            });
        }
        res.status(201).json({
            status: 'success',
            data: {
                pokemon,
            },
        });
    });
}

function updatePokemon(req, res) {
    const { id } = req.params;
    const newPokemon = {
        ...req.body,
    };
    const query = Pokemon.findByIdAndUpdate(id, newPokemon, { new: true });
    query.exec((err, pokemon) => {
        if (err) {
            return res.status(500).json({
                status: 'Request failed',
                message: err,
            });
        }
        if (!pokemon) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid id',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                pokemon,
            },
        });
    });
}

function deletePokemon(req, res) {
    const { id } = req.params;
    const query = Pokemon.findByIdAndDelete(id);
    query.exec((err, pokemon) => {
        if (err) {
            return res.status(500).json({
                status: 'Request failed',
                message: err,
            });
        }
        if (!pokemon) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid id',
            });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    });
}

module.exports = {
    getAllPokemons,
    getPokemonById,
    addPokemon,
    updatePokemon,
    deletePokemon
}