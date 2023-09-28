enum DayOfTheWeek {
    monday = 'monday',
    tuesday = 'tuesday',
    wednesday = 'wednesday',
    thursday = 'thursday',
    friday = 'friday',
    saturday = 'saturday',
    sunday = 'sunday',
}

interface DayHourSlot {
    day: DayOfTheWeek;
    hour: number;
}

interface TimeRange {
    from: number;
    to: number;
}

interface DayTimeSelection {
    day: DayOfTheWeek;
    time: ReadonlyArray<TimeRange>;
}
type Schedule = ReadonlyArray<DayTimeSelection>;

const scheduleDelimitation: Schedule = [
    {
        day: DayOfTheWeek.monday,
        time: [{from: 8, to: 20}],
    },
    {
        day: DayOfTheWeek.tuesday,
        time: [{from: 8, to: 20}],
    },
    {
        day: DayOfTheWeek.wednesday,
        time: [{from: 8, to: 20}],
    },
    {
        day: DayOfTheWeek.thursday,
        time: [{from: 8, to: 20}],
    },
    {
        day: DayOfTheWeek.friday,
        time: [{from: 8, to: 20}],
    },
];

const hours = Array.from({length: 24}, (_, i) => i);

const unavailablePartialSlots = scheduleDelimitation.reduce<Array<DayHourSlot>>((unavailableSlots, {day, time}) => {
    const availableSlots = time.reduce<Array<DayHourSlot>>((values, hourRange) => {
        const {from, to} = hourRange;

        return [...values, ...buildDayHourSlots(day, from, to)];
    }, []);

    console.log('availableSlots for: ' + day, availableSlots);

    const unavailableHours = hours.filter((hour) => !availableSlots.some((dayHour) => dayHour.hour === hour));

    console.log('unavailableHours for: ' + day, unavailableHours);

    const unavailableDayHourSlots = unavailableHours.map((hour) => ({day, hour}));

    console.log('unavailableDayHours for: ' + day, unavailableDayHourSlots);

    return [...unavailableSlots, ...unavailableDayHourSlots];
}, []);

console.log('unavailablePartialSlots', unavailablePartialSlots);

const unavailableFullDays = Object.values(DayOfTheWeek)
    .filter((day) => !unavailablePartialSlots.some((dayHour) => dayHour.day === day))
    .map((day) => {
        return hours.map((hour) => ({day, hour}));
    })
    .flat();

console.log('unavailableFullDays', unavailableFullDays);

const unavailableSlots = [...unavailablePartialSlots, ...unavailableFullDays];

console.log('unavailableSlots', unavailableSlots);

function buildDayHourSlots(day: DayOfTheWeek, from: number, to: number): ReadonlyArray<DayHourSlot> {
    return Array.from({length: to - from}, (_, i) => ({day, hour: i + from}));
}
