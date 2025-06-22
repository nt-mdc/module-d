import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherCardComponent } from '../../cards/weather-card/weather-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [WeatherCardComponent, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit{

  allWeathers: any[] = [];

  constructor(private weatherService: WeatherService) {}


  ngOnInit(): void {
      this.weatherService.get().subscribe((data) => {
        this.allWeathers = data;
        console.log(this.allWeathers);
        
      })
  }


}
