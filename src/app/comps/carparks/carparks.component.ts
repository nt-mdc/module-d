import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarparksService } from '../../services/carparks.service';
import { CarparksCardComponent } from '../../cards/carparks-card/carparks-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carparks',
  imports: [HttpClientModule, CarparksCardComponent, CommonModule],
  templateUrl: './carparks.component.html',
  styleUrl: './carparks.component.css',
})
export class CarparksComponent implements OnInit {
  carparks: any[] = [];
  lat = 0;
  long = 0;

  constructor(private carparkService: CarparksService) {}

  ngOnInit() {
    this.getCurrentLocation();
    this.carparkService.get().subscribe((data) => {
      this.carparks = Object.entries(data).map(([name, values]) => ({
        name,
        ...(values as any),
      })).sort((a,b) => a.name.localeCompare(b.name));
    });
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        this.lat = loc.coords.latitude;
        this.long = loc.coords.longitude;
      },
      () => {
        alert('fail');
      }
    );
  }

  log(item:any){
    console.log(item);
  }
}
