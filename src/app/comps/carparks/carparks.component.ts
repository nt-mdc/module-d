import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarparksService } from '../../services/carparks.service';
import { CarparksCardComponent } from '../../cards/carparks-card/carparks-card.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CarparksSingleComponent } from '../../cards/carparks-single/carparks-single.component';
import { PinningService } from '../../services/pinning.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil, timer } from 'rxjs';

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
export class CarparksComponent implements OnInit, OnDestroy {
  allCarparks: any[] = [];
  displayCarparks: any[] = [];
  lat = 0;
  long = 0;

  focusedCarpark: any = null;

  private destroyTimer = new Subject<void>();

  constructor(
    private carparkService: CarparksService,
    private pinningService: PinningService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const urlLat = params['latitude'];
      const urlLong = params['longitude'];

      if (urlLat && urlLong) {
        this.lat = parseFloat(urlLat);
        this.long = parseFloat(urlLong);
        console.log(this.lat, this.long);
      } else {
        console.log(this.lat, this.long);

        this.getCurrentLocation();
      }
    });

    timer(0, 10000)
      .pipe(
        switchMap(() => this.carparkService.get()),
        takeUntil(this.destroyTimer)
      )
      .subscribe((data) => {
        this.updateCarparksData(data);
      });
  }

  updateCarparksData(newData?: any) {
    if (this.allCarparks.length === 0) {
      this.allCarparks = Object.entries(newData).map(([name, values]) => ({
        name,
        ...(values as any),
        isPinned: this.pinningService.isPinned(name),
      }));
    } else {
      this.allCarparks.forEach((carpark) => {
        if (newData[carpark.name]) {
          carpark.availableSpaces = newData[carpark.name].availableSpaces;
        }
      });
    }
    this.sortCarparks();
  }

  sortCarparks() {
    const pinned = this.allCarparks
      .filter((c) => c.isPinned)
      .sort((a, b) => this.sortMethod(a, b));

    const unpinned = this.allCarparks
      .filter((c) => !c.isPinned)
      .sort((a, b) => this.sortMethod(a, b));

    this.displayCarparks = [...pinned, ...unpinned];
  }

  sortMethod(a: any, b: any) {
    if (this.carparkService.getMethod() == 'alphabet') {
      return a.name.localeCompare(b.name);
    } else {
      a.distance =
        Math.round(
          this.getDistanceFromLatLonInKm(
            this.lat,
            this.long,
            a.latitude,
            a.longitude
          ) * 100
        ) / 100;

      b.distance =
        Math.round(
          this.getDistanceFromLatLonInKm(
            this.lat,
            this.long,
            b.latitude,
            b.longitude
          ) * 100
        ) / 100;
      return a.distance - b.distance;
    }
  }

  togglePin(carpark: any) {
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
    navigator.geolocation.getCurrentPosition((loc) => {
      this.lat = loc.coords.latitude;
      this.long = loc.coords.longitude;
    });
  }

  focusOnCarpark(carparkData: any) {
    carparkData['distance'] =
      Math.round(
        this.getDistanceFromLatLonInKm(
          this.lat,
          this.long,
          carparkData.latitude,
          carparkData.longitude
        ) * 100
      ) / 100;
    this.focusedCarpark = carparkData;
  }

  getDistanceFromLatLonInKm(
    latitude1: any,
    longitude1: any,
    latitude2: any,
    longitude2: any
  ) {
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

  ngOnDestroy(): void {
    this.destroyTimer.next();
    this.destroyTimer.complete();
  }
}
