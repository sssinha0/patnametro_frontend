import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FareCalculatorComponent } from './pages/fare-calculator/fare-calculator.component';
import { NearbyStationsComponent } from './pages/nearby-stations/nearby-stations.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { MapViewComponent } from './components/map-view/map-view.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'fare', component: FareCalculatorComponent },
    { path: 'nearby', component: NearbyStationsComponent },
    {path: 'metro-map',component: MapViewComponent},
    { path: 'feedback', component: FeedbackComponent },
    { path: '**', redirectTo: '' }
];
