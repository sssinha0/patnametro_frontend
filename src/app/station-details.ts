import { MetroLineInfo, MetroStation } from "./application.interface";
export type Direction = 'up' | 'down';
export type LineColor = string;       // now generic string to allow any line/color
export type StationName = string;
// Dynamic lines info - add new lines here to extend your metro network
export class StationUtility {
    public static readonly metroLines: Record<LineColor, MetroLineInfo> = {
        Red: {
            color: '#d32f2f',
            order: [
                'Danapur Cantonment', 'Saguna Mor', 'RPS Mor', 'Patlipura', 'Rukanpura',
                'Raja Bazar', 'Patna Zoo', 'Vikas Bhawan', 'Vidyut Bhawan', 'Patna Junction',
                'CNLU', 'Mithapur', 'Ramkrishna Nagar', 'Jaganpura', 'Khemni Chak'
            ]
        },
        Blue: {
            color: '#1976d2',
            order: [
                'New ISBT', 'Zero Mile', 'Bhoothnath', 'Khemni Chak', 'Malahi Pakri',
                'Rajendra Nagar', 'Moin-ul-Haq Stadium', 'University', 'PMCH', 'Gandhi Maidan', 'Akashvani', 'Patna Junction'
            ]
        }
    };
    // Platform data per station per line per direction (up/down)
    public static readonly PLATFORM_DATA: Record<StationName, Partial<Record<LineColor, Record<Direction, number>>>> = {
        // Red Line Stations
        'Danapur Cantonment': { Red: { up: 1, down: 2 } },
        'Saguna Mor': { Red: { up: 1, down: 2 } },
        'RPS Mor': { Red: { up: 1, down: 2 } },
        'Patlipura': { Red: { up: 1, down: 2 } },
        'Rukanpura': { Red: { up: 1, down: 2 } },
        'Raja Bazar': { Red: { up: 1, down: 2 } },
        'Patna Zoo': { Red: { up: 1, down: 2 } },
        'Vikas Bhawan': { Red: { up: 1, down: 2 } },
        'Vidyut Bhawan': { Red: { up: 1, down: 2 } },

        // Interchange Station Patna Junction: Platforms for both lines
        'Patna Junction': {
            Red: { up: 1, down: 2 },
            Blue: { up: 3, down: 4 }
        },

        'CNLU': { Red: { up: 1, down: 2 } },
        'Mithapur': { Red: { up: 1, down: 2 } },
        'Ramkrishna Nagar': { Red: { up: 1, down: 2 } },
        'Jaganpura': { Red: { up: 1, down: 2 } },

        // Interchange Station Khemni Chak: Platforms for both lines
        'Khemni Chak': {
            Red: { up: 1, down: 2 },
            Blue: { up: 3, down: 4 }
        },

        // Blue Line Stations
        'New ISBT': { Blue: { up: 1, down: 2 } },
        'Zero Mile': { Blue: { up: 1, down: 2 } },
        'Bhoothnath': { Blue: { up: 1, down: 2 } },
        'Malahi Pakri': { Blue: { up: 1, down: 2 } },
        'Rajendra Nagar': { Blue: { up: 1, down: 2 } },
        'Akashvani': { Blue: { up: 1, down: 2 } },
        'Gandhi Maidan': { Blue: { up: 1, down: 2 } },
        'PMCH': { Blue: { up: 1, down: 2 } },
        'University': { Blue: { up: 1, down: 2 } },
        'Moin-ul-Haq Stadium': { Blue: { up: 1, down: 2 } },
    };
    public static readonly TRAVEL_TIME_BETWEEN_STATIONS: Record<LineColor, number> = {
        Red: 3,
        Blue: 3,
        // Add future lines here
    };
    public static readonly metroStations: MetroStation[] = [
        { name: 'Danapur Cantonment', latitude: 25.6185, longitude: 85.0465, line: 'Red', color: '#d32f2f' },
        { name: 'Saguna Mor', latitude: 25.6162, longitude: 85.0727, line: 'Red', color: '#d32f2f' },
        { name: 'RPS Mor', latitude: 25.6148, longitude: 85.0853, line: 'Red', color: '#d32f2f' },
        { name: 'Patlipura', latitude: 25.6130, longitude: 85.1014, line: 'Red', color: '#d32f2f' },
        { name: 'Rukanpura', latitude: 25.6121, longitude: 85.1106, line: 'Red', color: '#d32f2f' },
        { name: 'Raja Bazar', latitude: 25.6103, longitude: 85.1202, line: 'Red', color: '#d32f2f' },
        { name: 'Patna Zoo', latitude: 25.6085, longitude: 85.1281, line: 'Red', color: '#d32f2f' },
        { name: 'Vikas Bhawan', latitude: 25.6071, longitude: 85.1367, line: 'Red', color: '#d32f2f' },
        { name: 'Vidyut Bhawan', latitude: 25.6060, longitude: 85.1432, line: 'Red', color: '#d32f2f' },
        { name: 'Patna Junction', latitude: 25.6095, longitude: 85.1237, line: 'Red', color: '#d32f2f' },
        { name: 'CNLU', latitude: 25.6026, longitude: 85.1490, line: 'Red', color: '#d32f2f' },
        { name: 'Mithapur', latitude: 25.6011, longitude: 85.1552, line: 'Red', color: '#d32f2f' },
        { name: 'Ramkrishna Nagar', latitude: 25.6000, longitude: 85.1627, line: 'Red', color: '#d32f2f' },
        { name: 'Jaganpura', latitude: 25.5990, longitude: 85.1689, line: 'Red', color: '#d32f2f' },
        { name: 'Khemni Chak', latitude: 25.6023, longitude: 85.1680, line: 'Red', color: '#d32f2f' },
        { name: 'New ISBT', latitude: 25.6290, longitude: 85.1787, line: 'Blue', color: '#1976d2' },
        { name: 'Zero Mile', latitude: 25.6225, longitude: 85.1741, line: 'Blue', color: '#1976d2' },
        { name: 'Bhoothnath', latitude: 25.6185, longitude: 85.1672, line: 'Blue', color: '#1976d2' },
        { name: 'Khemni Chak', latitude: 25.6023, longitude: 85.1680, line: 'Blue', color: '#1976d2' },
        { name: 'Malahi Pakri', latitude: 25.6105, longitude: 85.1697, line: 'Blue', color: '#1976d2' },
        { name: 'Rajendra Nagar', latitude: 25.6100, longitude: 85.1500, line: 'Blue', color: '#1976d2' },
        { name: 'Akashvani', latitude: 25.6090, longitude: 85.1430, line: 'Blue', color: '#1976d2' },
        { name: 'Gandhi Maidan', latitude: 25.6112, longitude: 85.1374, line: 'Blue', color: '#1976d2' },
        { name: 'PMCH', latitude: 25.6151, longitude: 85.1335, line: 'Blue', color: '#1976d2' },
        { name: 'University', latitude: 25.6176, longitude: 85.1287, line: 'Blue', color: '#1976d2' },
        { name: 'Moin-ul-Haq Stadium', latitude: 25.6205, longitude: 85.1231, line: 'Blue', color: '#1976d2' },
        { name: 'Patna Junction', latitude: 25.6095, longitude: 85.1237, line: 'Blue', color: '#1976d2' }
      ];
      
}