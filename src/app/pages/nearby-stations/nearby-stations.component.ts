import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MetroStation } from '../../application.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StationUtility } from '../../station-details';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-nearby-stations',
  imports: [MatListModule, MatIconModule, TranslateModule, RouterLink, CommonModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './nearby-stations.component.html',
  styleUrl: './nearby-stations.component.css'
})
export class NearbyStationsComponent {
  userLocation: GeolocationCoordinates | null = null;
  nearbyStations: { station: MetroStation; distance: number }[] = [];
  locationError: string = '';
  loading: boolean = false;

  allStations = StationUtility.metroStations

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    this.loading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.userLocation = pos.coords;
          this.findNearestStations();
          this.loading = false;
        },
        (err) => {
          this.locationError = 'Unable to access location. Please allow location access.';
          this.loading = false;
        },
        { enableHighAccuracy: true }
      );
    } else {
      this.locationError = 'Geolocation is not supported by your browser.';
      this.loading = false;
    }
  }

  findNearestStations(): void {
    if (!this.userLocation) return;

    const userLat = this.userLocation.latitude;
    const userLng = this.userLocation.longitude;

    this.nearbyStations = this.allStations
      .map((station) => ({
        station,
        distance: this.getDistanceFromLatLonInKm(userLat, userLng, station.latitude, station.longitude)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5); // Top 5 closest
  }

  // Haversine formula
  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}