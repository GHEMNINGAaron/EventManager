import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { hugeArrowDown01 } from '@ng-icons/huge-icons';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../../shared/event-card/event-card.component';
import { EventService } from '../data-access/event.service';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIconComponent,
    EventCardComponent,
    CommonModule
  ],
  viewProviders: [provideIcons({ hugeArrowDown01 })],
  providers: [EventService],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})
export class MyEventsComponent {

  constructor(private eventService: EventService){}
  filter?: string;
  event!: any;

  ngOnInit(): void {
    this.getMyEvents()
    console.log(this.event)
  }

  getMyEvents(): void{
    this.eventService.getMyEvents().subscribe({
      next: (event: Event) => {
        this.event = event;
      },
      error: (err: any) => {
        console.log(err);
      },
    })
  }

  showFilter(filter?: string): void {
    this.filter = filter == this.filter ? undefined : filter;
  }
}
