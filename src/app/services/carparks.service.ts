import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarparksService {
  private method = (localStorage.getItem('carparks_method') as any) || 'alphabet';

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get('http://localhost/module_d_api.php/carparks.json');
  }

  setMethod(m: 'alphabet' | 'distance') {
    this.method = m;
    localStorage.setItem('carparks_method', m);
  }

  getMethod(): 'alphabet' | 'distance' {
    return this.method;
  }
}
