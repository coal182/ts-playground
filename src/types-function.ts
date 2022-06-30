type Hours = ReadonlyArray<Hour>;

interface Hour {
    hour: number;
    availableSeconds: number;
    reservedSeconds: number;
    availableReservedSeconds: number;
    potentiallyAvailableSeconds: number;
}

function getUnavailableHour(hour: number): Hour {
    return {
        hour,
        availableSeconds: 0,
        reservedSeconds: 0,
        availableReservedSeconds: 0,
        potentiallyAvailableSeconds: 0,
    };
}

function getHoursRange(from: number, to: number, mapper: (number: number) => Hour): Array<Hour> {
    return Array.from({length: to - from}).map((_, i) => mapper(i + from));
}

function getUnavailableHoursRange(from: number, to: number): Array<Hour> {
    return getHoursRange(from, to, getUnavailableHour);
}

export function typesFunction(): void {
    console.log(...getUnavailableHoursRange(20, 24));
}
