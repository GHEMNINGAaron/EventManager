import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { hugeArrowDown01 } from '@ng-icons/huge-icons';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../../shared/event-card/event-card.component';
import { EventService } from '../data-access/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    NgIconComponent,
    EventCardComponent
  ],
  viewProviders: [provideIcons({ hugeArrowDown01 })],
  providers:[EventService],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {  

  constructor(private eventService: EventService){}
  filter?: string;
  event!: any;
  
  ngOnInit(): void {
    this.getEvents()
    console.log(this.event)
  }

  getEvents(): void{
    this.eventService.getEvents().subscribe({
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
