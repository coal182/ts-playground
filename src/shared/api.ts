import fetch from 'node-fetch';

export class Api {
    public static async get(url: string): Promise<any> {
        return fetch(url);
    }
}
