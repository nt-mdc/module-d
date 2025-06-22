import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css',
})
export class WeatherCardComponent implements AfterViewInit {
  @Input() date: string = 'Default';
  @Input() status: string = 'Default';
  @Input() lowerTemp: string = 'Default';
  @Input() upperTemp: string = 'Default';

  @ViewChild('svgContainer', { static: false }) svgContainer!: ElementRef<HTMLDivElement>;

  constructor (private http: HttpClient, private render: Renderer2) {}

  ngAfterViewInit(): void {
    this.appendSvg().then();
  }

  appendSvg(): Promise<void> {
    const baseUrl = 'assets/svg/';
    const svg = this.status.toLowerCase();
    const url = `${baseUrl}${svg}.svg`;

    return new Promise((resolve, reject) => {
      this.http.get(url, {responseType: 'text'}).subscribe({
        next: (svgContent) => {
          const parser = new DOMParser();
          const svgEl = parser.parseFromString(svgContent, 'image/svg+xml');
          svgEl.documentElement.classList.add('svg')
          this.render.appendChild(this.svgContainer.nativeElement, svgEl.documentElement);
          resolve();
        },
        error: (err) => {
          console.error('error', err);
          reject(err);
        }
      })
    })
  }
}
