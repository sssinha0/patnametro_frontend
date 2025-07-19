import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MetroStation, SearchStation } from '../../application.interface'
import { TranslateModule } from '@ngx-translate/core';
import { StationUtility } from '../../station-details';
@Component({
  selector: 'app-station-search-box',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './station-search-box.component.html',
  styleUrls: ['./station-search-box.component.css']
})
export class StationSearchBoxComponent {
  startStation = '';
  endStation = '';
  stations: MetroStation[] = StationUtility.metroStations;
  @Output() search = new EventEmitter<SearchStation>();

  submitSearch() {
    if (this.startStation && this.endStation) {
      let searchStation: SearchStation = {
        startStation: this.startStation,
        endStation: this.endStation
      }
      this.search.emit(searchStation);
    }
  }

  reset() {
    this.search.emit({startStation:'',endStation:''});
  }
}
