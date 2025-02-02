// Type definitions for timezone-js
// Project: https://github.com/mde/timezone-js
// Definitions by: bonnici <https://github.com/bonnici>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Imported from: https://github.com/soywiz/typescript-node-definitions/timezone-js.d.ts

export declare var timezone: TimezoneJs;

export declare class Date {
    constructor(timezone?: string);
    // Note due to naming conflict I have not found a way to introduce the constructor
    // that takes a regular Date object. Instead, I defined it to take an Object.
    constructor(date: Object, timezone?: string);
    constructor(utcMillis: number, timezone?: string);
    constructor(time: string, timezone?: string);
    constructor(
        year?: number,
        month?: number,
        day?: number,
        hour?: number,
        minute?: number,
        second?: number,
        millisecond?: number,
        timezone?: string,
    );
    setTimezone: (timezone: string) => void;

    // regular Date members
    toString(format?: string): string;
    toDateString(): string;
    toTimeString(): string;
    toLocaleString(): string;
    toLocaleDateString(): string;
    toLocaleTimeString(): string;
    valueOf(): number;
    getTime(): number;
    getFullYear(): number;
    getUTCFullYear(): number;
    getMonth(): number;
    getUTCMonth(): number;
    getDate(): number;
    getUTCDate(): number;
    getDay(): number;
    getUTCDay(): number;
    getHours(): number;
    getUTCHours(): number;
    getMinutes(): number;
    getUTCMinutes(): number;
    getSeconds(): number;
    getUTCSeconds(): number;
    getMilliseconds(): number;
    getUTCMilliseconds(): number;
    getTimezoneOffset(): number;
    setTime(time: number): number;

    // Note the setters have a non-void return type. Date has them as well, according to TypeScript
    setMilliseconds(ms: number): number;
    setUTCMilliseconds(ms: number): number;
    setSeconds(sec: number, ms?: number): number;
    setUTCSeconds(sec: number, ms?: number): number;
    setMinutes(min: number, sec?: number, ms?: number): number;
    setUTCMinutes(min: number, sec?: number, ms?: number): number;
    setHours(hours: number, min?: number, sec?: number, ms?: number): number;
    setUTCHours(hours: number, min?: number, sec?: number, ms?: number): number;
    setDate(date: number): number;
    setUTCDate(date: number): number;
    setMonth(month: number, date?: number): number;
    setUTCMonth(month: number, date?: number): number;
    setFullYear(year: number, month?: number, date?: number): number;
    setUTCFullYear(year: number, month?: number, date?: number): number;
    toUTCString(): string;
    toISOString(): string;
    toJSON(key?: any): string;
}

export interface TimezoneJs {
    zoneFileBasePath: string;
    loadingScheme: number;
    loadingSchemes: TimezoneJsLoadingSchemes;

    transport(opts: TimezoneJsOptions): any;
    init(opts?: TimezoneJsOptions): any;
    getAllZones(): string[];
    loadZoneDataFromObject(obj: Object): void;
}

export interface TimezoneJsOptions {
    async?: boolean | undefined;
    success?: ((data: string) => void) | undefined;
    error?: ((err: Error) => void) | undefined;
    url?: string | undefined;
}

export declare class TimezoneJsLoadingSchemes {
    PRELOAD_ALL: number;
    LAZY_LOAD: number;
    MANUAL_LOAD: number;
}
