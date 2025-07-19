import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Utility } from '../../utilit';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-language-switch',
  imports: [MatSelectModule, MatFormFieldModule, CommonModule, MatIconModule, TranslateModule],
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css']
})
export class LanguageSwitchComponent {
  selectedLang = sessionStorage.getItem("lan") ?? 'en'; // default
  languages = Utility.languages
  constructor(private translate: TranslateService) { }
  switchLanguage(langCode: string) {
    sessionStorage.setItem("lan", langCode)
    this.translate.use(langCode);
  }
}