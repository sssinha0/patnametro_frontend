import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar,LanguageSwitchComponent,MatIconModule,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
