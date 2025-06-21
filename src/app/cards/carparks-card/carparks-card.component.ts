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
  @Input() long: any = 0;
  @Input() isPinned: boolean = false;

  @Output() cardClick = new EventEmitter<any>();
  @Output() pinClick = new EventEmitter<void>();


  onCardClick() {
    this.cardClick.emit({
      'title': this.title,
      'location': this.location,
      'parks': this.parks,
      'latitude': this.lat,
      'longitude': this.long
    })
  }

  onPinClick(event: MouseEvent) {
    event.stopPropagation();
    this.pinClick.emit();
  }

}
