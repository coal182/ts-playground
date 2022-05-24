import fetch from "node-fetch";

export interface PokemonListResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: PokemonUrlObject[],
}

export interface PokemonUrlObject {
    name: string,
    url: string,
}

export const getPokemonsIds = (limit: number): Promise<PokemonListResponse> => {
    const requestUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=0`;
    return fetch(requestUrl)
            .then((res) => res.json())
            .catch((err) => err);
};