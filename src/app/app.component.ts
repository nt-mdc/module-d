import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { CommonModule } from '@angular/common';
import { CarparksComponent } from './comps/carparks/carparks.component';
import { EventsComponent } from './comps/events/events.component';
import { WeatherComponent } from './comps/weather/weather.component';
import { SettingComponent } from './comps/setting/setting.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'base-module-d';
  component: any = CarparksComponent;
  activePage: string = "carparks";


  componentMap: { [key: string]: any } = {
    carparks: CarparksComponent,
    events: EventsComponent,
    weather: WeatherComponent,
    setting: SettingComponent
  }

  loadComponent(name: string) {
    if (this.activePage === name) return;

    this.component = this.componentMap[name] || null;
    this.activePage = name;
  }
  
}
