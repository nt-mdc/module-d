import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from '../../cards/event-card/event-card.component';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [EventCardComponent, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  allEvents: any[] = [];
  beginningDate: any = null;
  endingDate: any = null;

  constructor(private eventService: EventsService) {}

  ngOnInit() {
    this.eventService.get().subscribe((data) => {
      this.allEvents = data.events;

      console.log(this.allEvents);
    });
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log('Valor digitado:', value);
  }
}
