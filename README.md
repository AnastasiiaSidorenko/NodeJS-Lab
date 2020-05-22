### How to run project
1. Run `npm install`
2. Run `cd src`
*  Run `node index.js -h` to see available options
*  Run `npx nodemon app.js` to run the server

### How to use linter
* Run `npm run lint` to run eslint
* Run `npm run lint-fix` to fix problems automatically

### How to use CLI
* If you want to reverse and cut the string in CLI, run `node index.js --length 4 -- foobar`
* If you want to convert csv to json file, run `node index.js --file index --name foo`

### How to launch the server
1. Launch `mongo.exe` in `C:\Program Files\MongoDB\Server\4.2\bin`
2. Create new base `pokedex` and new collection `pokemons` in MongoDB
3. Run `npx nodemon app.js`