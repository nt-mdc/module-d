import { Component, HostListener, OnInit } from '@angular/core';
import { EventCardComponent } from '../../cards/event-card/event-card.component';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  imports: [EventCardComponent, CommonModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  allEvents: any[] = [];
  beginningDate: string | null = null;
  endingDate: string | null = null;
  isLoading: boolean = false;
  nextPageUrl: string | null = null;

  constructor(private eventService: EventsService) {}

  ngOnInit() {
    this.loadInitialEvents()
  }

  loadInitialEvents() {

    this.allEvents = [];
    this.isLoading = true;
    this.nextPageUrl = null;

    this.eventService
      .get(undefined, this.beginningDate, this.endingDate)
      .subscribe((data) => {
        this.isLoading = false;
        this.allEvents = data.events;
        this.nextPageUrl = data.pages?.next;
      });
  }

  loadMoreEvents(){

    if ( this.isLoading || !this.nextPageUrl){
      return;
    }

    this.isLoading = true;
    this.eventService
      .get(this.nextPageUrl)
      .subscribe((data) => {
        this.allEvents.push(...data.events);
        this.nextPageUrl = data.pages?.next;
        this.isLoading = false;
      });

  }

  onDateChange() {
    if (this.beginningDate && this.endingDate) {
      this.loadInitialEvents();
    }
  }

  onScroll(event: any) {
    const element = event.target;

    if (((element.scrollHeight - element.scrollTop) <= element.clientHeight + 200) && !this.beginningDate && !this.endingDate){
      this.loadMoreEvents();
    }
  }
}
