import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Route } from '../../application.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-route-result',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatToolbarModule, TranslateModule,],
  templateUrl: './route-result.component.html',
  styleUrls: ['./route-result.component.css']
})
export class RouteResultComponent {
  @Input() routeResults: Route[] = []

}
