const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const PokemonsService = require('../services/pokemons.service');

describe('PokemonsService', () => {

    let service;
    let pokemonsServiceStub;
    const pokemons = [
        {
            "name": "bulbasaur",
            "id": 1,
            "damage": 51,
            "isCaught": true,
            "createdAt": "2020-04-15"
        },
        {
            "name": "ivysaur",
            "id": 2,
            "damage": 0,
            "isCaught": false,
            "createdAt": "2020-04-15"
        },
        {
            "name": "venusaur",
            "id": 3,
            "damage": 0,
            "isCaught": false,
            "createdAt": "2020-04-15"
        },
        {
            "name": "charmander",
            "id": 4,
            "damage": 0,
            "isCaught": false,
            "createdAt": "2020-04-15"
        },
        {
            "name": "charmeleon",
            "id": 5,
            "damage": 62,
            "isCaught": false,
            "createdAt": "2020-04-15"
        },
        {
            "name": "charizard",
            "id": 6,
            "damage": 0,
            "isCaught": false,
            "createdAt": "2020-04-15"
        },
        {
            "name": "squirtle",
            "id": 7,
            "damage": 85,
            "isCaught": false,
            "createdAt": "2020-04-15"
        },
        {
            "name": "wartortle",
            "id": 8,
            "damage": 0,
            "isCaught": false,
            "createdAt": "2020-04-15"
        },
        {
            "name": "blastoise",
            "id": 9,
            "damage": 0,
            "isCaught": false,
            "createdAt": "2020-04-15"
        },
        {
            "name": "caterpie",
            "id": 10,
            "damage": 0,
            "isCaught": false,
            "createdAt": "2020-04-15"
        },
        {
            "name": "metapod",
            "id": 11,
            "damage": 0,
            "isCaught": false,
            "createdAt": "2020-04-15"
        },
        {
            "name": "butterfree",
            "id": 12,
            "damage": 0,
            "isCaught": false,
            "createdAt": "2020-04-15"
        }
    ];

    before(() => {
        service = PokemonsService;
        pokemonsServiceStub = sinon.stub(service, 'getAllPokemons');
    });

    after(() => {
        pokemonsServiceStub.restore();
    });

    it('should get all pokemons', () => {
        pokemonsServiceStub.returns(pokemons);
        let response = service.getAllPokemons();
        expect(response).to.be.eql(pokemons);
    })
})