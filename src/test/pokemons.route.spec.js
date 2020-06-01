const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const passport = require('passport');
const expect = chai.expect;
const auth = require('../routes/auth');

const PokemonsService = require('../services/pokemons.service');
const router = require('../routes/pokemons');
const apiBase = 'http://localhost:8080';

chai.use(chaiHttp);

describe('getAllPokemons route', () => {

    before(() => {
        sinon.stub(auth, 'post').callsFake((req, res, next) => {
            next();
        });

        sinon.stub(passport, 'authenticate').callsFake((req, res, next) => {
            next();
        });
    });

    it('should get pokemons', (done) => {

        chai.request('http://localhost:8080')
            .get('/pokemons')
            .set('Authorization', 'Bearer token')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});