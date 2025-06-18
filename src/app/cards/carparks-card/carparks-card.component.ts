import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carparks-card',
  imports: [],
  templateUrl: './carparks-card.component.html',
  styleUrl: './carparks-card.component.css',
})
export class CarparksCardComponent {
  @Input() title: string = 'Default';
  @Input() location: string = 'Default';
  @Input() parks: string = 'Default';

  @Output() cardClick = new EventEmitter<string>();
}
