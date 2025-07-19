import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StationUtility } from '../../station-details';
import { MetroStation } from '../../application.interface';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-fare-calculator',
  imports: [MatSelectModule, MatIconModule, RouterLink, MatFormFieldModule, MatButtonModule, FormsModule, CommonModule, TranslateModule],
  templateUrl: './fare-calculator.component.html',
  styleUrl: './fare-calculator.component.css'
})
export class FareCalculatorComponent {
  stations: MetroStation[] = StationUtility.metroStations;
  fromStation: string = '';
  toStation: string = '';

  fareResult: { fare: number; estimatedTime: string; stops: number } | null = null;

  calculateFare(): void {
    if (this.fromStation && this.toStation && this.fromStation !== this.toStation) {
      const fromIndex = this.stations.findIndex(station => station.name === this.fromStation);
      const toIndex = this.stations.findIndex(station => station.name === this.toStation);

      if (fromIndex >= 0 && toIndex >= 0) {
        const stops = Math.abs(toIndex - fromIndex);
        const fare = 10 + stops * 5; // Base fare + 5 per station
        const estimatedTime = `${stops * 3} mins`;

        this.fareResult = {
          fare,
          estimatedTime,
          stops
        };
      } else {
        this.fareResult = null;
        alert('Selected station(s) not found in list.');
      }
    } else {
      this.fareResult = null;
    }
  }

}
