export function giveMeTheFirstValueAvailable(): void {
    const valorA = null;
    const valorB = null;
    const valorC = 'valorC';

    const valor = valorA ?? valorB ?? valorC;

    console.log(valor);
}

export function objInsteadSwitch(adversario: string): string {
    const DEFAULT_LOKI = 'Loki';
    const DISFRACES_LOKI: Record<string, string> = {
        'Iron-Man': 'Magneto',
        Hulk: 'Thanos',
        Thor: 'Odin',
    };

    const loki = DISFRACES_LOKI[adversario] || DEFAULT_LOKI;

    return loki;
}
