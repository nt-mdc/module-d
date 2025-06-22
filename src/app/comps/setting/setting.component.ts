import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CarparksService } from '../../services/carparks.service';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  constructor(public themeService: ThemeService, public carparkService: CarparksService) {}

  changeTheme(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'light' | 'dark' | 'system';
    this.themeService.setTheme(value);
  }

  changeMethod(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'alphabet' | 'distance';
    this.carparkService.setMethod(value);
  }
}
