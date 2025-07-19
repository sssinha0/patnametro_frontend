import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { StationSearchBoxComponent } from "../station-search-box/station-search-box.component";
import { RouteResultComponent } from "../route-result/route-result.component";
import { CommonModule } from '@angular/common';
import { MetroLineInfo, QueueItem, Route, RouteSegment, SearchStation, StationInfo } from '../../application.interface';
import { Direction, LineColor, StationName } from '../../station-details';
import { StationUtility } from '../../station-details';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MatIconModule, TranslateModule, MatToolbarModule, RouterLink, CommonModule, NavbarComponent, StationSearchBoxComponent, RouteResultComponent],
})
export class HomeComponent {
  routeResult: Route[] = [];
  constructor() {
    // initialize if needed
  }

  /**
   * Get list of metro lines serving a station dynamically
   */
  private getLineOfStation(station: StationName): LineColor[] {
    return Object.keys(StationUtility.metroLines).filter(line =>
      StationUtility.metroLines[line].order.includes(station)
    );
  }

  /**
   * Get neighboring stations with line info (adjacent stations on each line)
   */
  private getNeighbors(station: StationName): { station: StationName; line: LineColor }[] {
    const neighbors: { station: StationName; line: LineColor }[] = [];

    for (const line of Object.keys(StationUtility.metroLines)) {
      const stations = StationUtility.metroLines[line].order;
      const idx = stations.indexOf(station);
      if (idx === -1) continue;

      if (idx > 0) neighbors.push({ station: stations[idx - 1], line });
      if (idx < stations.length - 1) neighbors.push({ station: stations[idx + 1], line });
    }

    return neighbors;
  }

  /**
   * Determine travel direction (up/down) for platform selection
   */
  private getDirection(from: StationName, to: StationName, line: LineColor): Direction {
    const order = StationUtility.metroLines[line].order;
    return order.indexOf(from) < order.indexOf(to) ? 'up' : 'down';
  }

  /**
   * Simple fare calculation based on number of stations travelled
   */
  private calculateFare(stations: StationInfo[]): number {
    const farePerStation = 10; // example fare per station
    return farePerStation * (stations.length - 1);
  }

  /**
   * Main function to calculate all possible routes from start to end station
   * Returns array of RouteResult, each with stations[] and fare
   */
  calculateAllRoutes(from: StationName, to: StationName, maxDepth = 30): Route[] {
    if (from === to) {
      const line = this.getLineOfStation(from)[0];
      const platform = StationUtility.PLATFORM_DATA[from]?.[line]?.['up'] ?? 0;
      return [{
        stationDetails: [{
          stationList: [from],
          line,
          color: StationUtility.metroLines[line]?.color,
          boardingPlatform: platform,
          towards: from
        }],
        fare: 0,
        time: 0
      }];
    }

    const routes: Route[] = [];
    const queue: QueueItem[] = [];

    const startLines = this.getLineOfStation(from);
    for (const line of startLines) {
      const visitedStations = new Set<StationName>();
      visitedStations.add(from);

      queue.push({
        path: [{
          station: from,
          line,
          platform: 0,
          color: StationUtility.metroLines[line].color
        }],
        currentStation: from,
        currentLine: line,
        totalTime: 0,
        directions: [],
        visitedStations
      });
    }

    const splitPathToSegments = (path: StationInfo[], directions: Direction[]): RouteSegment[] => {
      if (!path.length) return [];

      const segments: RouteSegment[] = [];

      let currentLine = path[0].line;
      let segmentStations: StationName[] = [path[0].station];
      let segmentDirections: Direction[] = [];

      for (let i = 1; i < path.length; i++) {
        const station = path[i];
        if (station.line === currentLine) {
          segmentStations.push(station.station);
          if (i - 1 < directions.length) {
            segmentDirections.push(directions[i - 1]);
          }
        } else {
          // Interchange: close previous segment
          const boardingDir = segmentDirections[0] ?? 'up';
          const boardingPlatform = StationUtility.PLATFORM_DATA[segmentStations[0]]?.[currentLine]?.[boardingDir] ?? 0;

          segments.push({
            stationList: [...segmentStations],
            line: currentLine,
            color: StationUtility.metroLines[currentLine].color,
            boardingPlatform,
            towards: segmentStations[segmentStations.length - 1]
          });

          // Start new with interchange
          currentLine = station.line;
          segmentStations = [path[i - 1].station, station.station];
          segmentDirections = [directions[i - 1]];
        }
      }

      // Final segment
      if (segmentStations.length) {
        const boardingDir = segmentDirections[0] ?? 'up';
        const boardingPlatform = StationUtility.PLATFORM_DATA[segmentStations[0]]?.[currentLine]?.[boardingDir] ?? 0;

        segments.push({
          stationList: [...segmentStations],
          line: currentLine,
          color: StationUtility.metroLines[currentLine].color,
          boardingPlatform,
          towards: segmentStations[segmentStations.length - 1]
        });
      }

      return segments;
    };

    while (queue.length > 0) {
      const {
        path,
        directions,
        currentStation,
        currentLine,
        totalTime,
        visitedStations
      } = queue.shift()!;

      if (path.length > maxDepth) continue;

      if (currentStation === to) {
        const segments = splitPathToSegments(path, directions);
        const fare = this.calculateFare(path);
        routes.push({ stationDetails: segments, fare, time: totalTime });
        continue;
      }

      for (const neighbor of this.getNeighbors(currentStation)) {
        const neighborStation = neighbor.station;
        const neighborLine = neighbor.line;
        const currentStationObj = path[path.length - 1];

        const direction = this.getDirection(currentStation, neighborStation, neighborLine);
        const travelTime = StationUtility.TRAVEL_TIME_BETWEEN_STATIONS[neighborLine] ?? 3;

        // Allow revisiting same station only ONCE during interchange
        const isLineChange = currentLine !== neighborLine && neighborStation === currentStation;

        const alreadyVisited = visitedStations.has(neighborStation);

        if (alreadyVisited && !isLineChange) {
          continue; // 🧠 Prevent FULL loop across any lines
        }

        const newPath: StationInfo[] = [...path, {
          station: neighborStation,
          line: neighborLine,
          platform: 0,
          color: StationUtility.metroLines[neighborLine].color
        }];

        const newDirections = [...directions, direction];

        const newVisited = new Set(visitedStations);
        newVisited.add(neighborStation);

        queue.push({
          path: newPath,
          directions: newDirections,
          currentStation: neighborStation,
          currentLine: neighborLine,
          totalTime: totalTime + travelTime,
          visitedStations: newVisited
        });
      }
    }

    // Sort by shortest total station count
    routes.sort((a, b) =>
      a.stationDetails.reduce((s, r) => s + r.stationList.length, 0)
      - b.stationDetails.reduce((s, r) => s + r.stationList.length, 0)
    );

    return routes;
  }
  onSearch($event: SearchStation): void {
    if (Object.keys($event) && $event?.endStation && $event?.startStation) {
      this.routeResult = [];
      this.routeResult = this.calculateAllRoutes($event.startStation, $event.endStation);
    } else {
      this.routeResult = [];
    }
  }
}