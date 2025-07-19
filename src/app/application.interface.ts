import { Direction, LineColor, StationName } from "./station-details";

export interface SearchStation {
    startStation: string;
    endStation: string
}
export interface MetroLineInfo {
    color: string;              // hex color code or css color string
    order: string[];       // ordered stations on the line
}
export interface QueueItem {
    path: StationInfo[];
    directions: Direction[];
    currentStation: StationName;
    currentLine: LineColor;
    totalTime: number;
    visitedStations: Set<StationName>; // 🆕 Track all visited stations globally per route
}


export interface StationInfo {
    station: string;
    line: string;
    platform: number;
    color: string;
}
export interface RouteSegment {
    stationList: string[];
    line: string;
    color: string;
    boardingPlatform: number;
    towards: string;
}
export interface MetroStation {
    name: string;
    latitude: number;
    longitude: number;
    line: string; // Optional: Red, Blue etc.
    color?: string;
}

export interface Route {
    stationDetails: RouteSegment[];
    fare: number;
    time: number;
}

