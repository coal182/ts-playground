import {Api} from '../src/shared/api';

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonUrlObject[];
}

export interface PokemonUrlObject {
    name: string;
    url: string;
}

export const getPokemonsIds = async (limit: number): Promise<PokemonListResponse> => {
    const requestUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=0`;
    return Api.get(requestUrl)
        .then(async (res) => res.json())
        .catch((err) => err);
};
