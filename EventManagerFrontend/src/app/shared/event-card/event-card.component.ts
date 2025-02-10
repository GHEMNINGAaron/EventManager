import { EventService } from './../../events/data-access/event.service';
import { Component, Input } from '@angular/core';
import { Event } from '../interfaces/event.interface';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  providers: [DatePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  @Input() event!: any;

  @Input() myEvents!: boolean;

  @Input() registeredEvents!: boolean;

  constructor(private datePipe: DatePipe, private eventService: EventService, private router: Router) {}

  registerEvent(id: number): any {
    return this.eventService.registerEvent(id);
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd MMM yyyy, HH:mm') || '';
  }

  deleteEvent(id: number): any {
    return this.eventService.deleteEvent(id).subscribe(
      (response) => {
        console.log('Event deleted', response);
      },
      (error) => {
        console.error('Connection error', error);
      }
    );
  }

  unregisterEvent(id: number): any {
    return this.eventService.unregisterEvent(id).subscribe(
      (response) => {
        console.log('Unregistration successful', response);
      },
      (error) => {
        console.error('Connection error', error);
      }
    );
  }

  editEvent(event: Event): any {
    localStorage.setItem('editedEvent', JSON.stringify(event));
    this.router.navigate(['/events/edit-event']);
  }
}
