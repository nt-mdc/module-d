import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  baseUrl: string = "http://localhost/module_d_api.php/events.json";

  constructor(private http: HttpClient) {}

  get(beginDate?: string, endDate?: string): Observable<any> {
    beginDate && endDate ? this.baseUrl += `?beginning_date=${beginDate}&ending_date=${endDate}` : null;
    return this.http.get(this.baseUrl);
  }
}
