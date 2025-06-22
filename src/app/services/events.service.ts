import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  baseUrl: string = "http://localhost";

  constructor(private http: HttpClient) {}

  get(url?: any, beginDate?: any, endDate?: any): Observable<any> {
    let requestUrl = url || "/module_d_api.php/events.json";
    
    if (!url && (beginDate && endDate)) {
      const params = new URLSearchParams();
      params.set("beginning_date", beginDate);
      params.set("ending_date", endDate);

      requestUrl += `?${params.toString()}`;
    }

    let finalUrl = this.baseUrl + requestUrl;    
    return this.http.get(finalUrl);
  }
}
