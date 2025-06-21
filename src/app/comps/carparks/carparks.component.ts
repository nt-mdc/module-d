import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarparksService } from '../../services/carparks.service';
import { CarparksCardComponent } from '../../cards/carparks-card/carparks-card.component';
import { CommonModule } from '@angular/common';
import { CarparksSingleComponent } from '../../cards/carparks-single/carparks-single.component';
import { PinningService } from '../../services/pinning.service';

@Component({
  selector: 'app-carparks',
  imports: [
    HttpClientModule,
    CarparksCardComponent,
    CommonModule,
    CarparksSingleComponent,
  ],
  templateUrl: './carparks.component.html',
  styleUrl: './carparks.component.css',
})
export class CarparksComponent implements OnInit {
  allCarparks: any[] = [];
  displayCarparks: any[] = [];
  lat = 0;
  long = 0;

  focusedCarpark: any = null;

  constructor(
    private carparkService: CarparksService,
    private pinningService: PinningService
  ) {}

  ngOnInit() {
    this.getCurrentLocation();
    this.carparkService.get().subscribe((data) => {
      this.allCarparks = Object.entries(data)
        .map(([name, values]) => ({
          name,
          ...(values as any),
          isPinned: this.pinningService.isPinned(name)
        }));
        this.sortCarparks();
    });
  }

  sortCarparks() {
    const pinned = this.allCarparks.filter(c => c.isPinned).sort((a,b) => a.name.localeCompare(b.name));

    const unpinned = this.allCarparks.filter(c => !c.isPinned).sort((a,b) => a.name.localeCompare(b.name));

    this.displayCarparks = [...pinned, ...unpinned];
  }

  togglePin(carpark: any){
    if (this.pinningService.isPinned(carpark.name)) {
      this.pinningService.unpin(carpark.name);
      carpark.isPinned = false;
    } else {
      this.pinningService.pin(carpark.name);
      carpark.isPinned = true;
    }

    this.sortCarparks();
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

  focusOnCarpark(carparkData: any) {
    carparkData['distance'] =  Math.round(this.getDistanceFromLatLonInKm(this.lat, this.long, carparkData.latitude, carparkData.longitude) * 100) / 100;
    this.focusedCarpark = carparkData;
  }

  getDistanceFromLatLonInKm(latitude1: any, longitude1: any, latitude2: any, longitude2: any) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(latitude2 - latitude1); // deg2rad below
    var dLon = this.deg2rad(longitude2 - longitude1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(latitude1)) *
        Math.cos(this.deg2rad(latitude2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }
}
