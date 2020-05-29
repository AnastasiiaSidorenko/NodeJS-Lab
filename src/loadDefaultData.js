const fs = require('fs');
const Pokemon = require('./schemas/pokemon');
const User = require('./schemas/user');

const defaultPokemons = JSON.parse(fs.readFileSync('../pokemons.json'));
const defaultUsers = JSON.parse(fs.readFileSync('../users.json'));

module.exports = {
  loadDefaultPokemons() {
    Pokemon.insertMany(defaultPokemons, (err) => {
      if (err) {
        console.log('Pokemons request failed');
      }
      console.log('Pokemons are saved!');
    });
  },
  loadDefaultUsers() {
    defaultUsers.forEach(user => {
      User.create(user, (err) => {
        if (err) {
          console.log('User request failed');
        }
        console.log(`User ${user.username} is saved!`);
      });
    });
  },
};
