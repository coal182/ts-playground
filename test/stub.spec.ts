import {expect} from 'chai';
//import {createSandbox} from 'sinon';
/* eslint-disable */
const sinon = require('sinon');
import {Api} from '../src/shared/api';
import {getPokemonsIds, PokemonListResponse, PokemonUrlObject} from './stub';

const responseObject = {
    status: '201',
    json: (): PokemonListResponse => {
        return jsonObject;
    },
};

const jsonObject = {
    count: 1126,
    next: 'https://pokeapi.co/api/v2/pokemon/?offset=3&limit=3',
    previous: null,
    results: [
        {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
        {
            name: 'venusaur',
            url: 'https://pokeapi.co/api/v2/pokemon/3/',
        },
    ],
};

describe('with Stub: getPokemonsIds', () => {
    const sandbox = sinon.createSandbox();

    before(() => {
        sandbox.restore();
        sandbox.stub(Api, 'get').resolves(Promise.resolve(responseObject));
    });

    after(() => {
        sandbox.restore();
    });

    it('should getPokemonsIds', async () => {
        const pokemons: PokemonListResponse = await getPokemonsIds(1);
        //console.log(pokemons);
        expect(pokemons.results.length).to.be.equal(3);
        pokemons.results.forEach((pokemon) => {
            expect(pokemon).to.have.property('name');
            expect(pokemon).to.have.property('url');
        });
    });
});
