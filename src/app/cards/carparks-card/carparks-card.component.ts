import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carparks-card',
  imports: [CommonModule],
  templateUrl: './carparks-card.component.html',
  styleUrl: './carparks-card.component.css',
})
export class CarparksCardComponent {
  @Input() title: string = 'Default';
  @Input() location: string = 'Default';
  @Input() parks: string = 'Default';
  @Input() lat: number = 0;
  @Input() long: number = 0;

  isClicked =  false;

  @Output() cardClick = new EventEmitter<string>();

  parkClick() {
    this.isClicked = !this.isClicked;
  }
}
