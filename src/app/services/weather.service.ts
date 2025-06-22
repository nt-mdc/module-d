import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  get():Observable<any> {
    return this.http.get("http://localhost/module_d_api.php/weather.json");
  }
}
