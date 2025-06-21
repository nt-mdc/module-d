import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  @Input() title: string = "Default";
  @Input() date: string = "Default";
  @Input() image: string = "Default";

}
