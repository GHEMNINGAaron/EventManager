import { AuthService } from './../../auth/service/auth.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { hugeUser, hugeColors, hugeCalendar03, hugeBookmark01 } from '@ng-icons/huge-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterModule],
  providers: [AuthService],
  viewProviders: [provideIcons({ hugeUser, hugeColors, hugeCalendar03, hugeBookmark01 })],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() color!: string;
  @Input() page!: string;
  @Input() bg!: string;

  token?: string;
  newEvent ? : boolean = false;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.token = this.authService.getToken() || '';
    this.newEvent = (this.token !== '') ? true : false;
  }
  
  links = [
    {
      icon: 'aspectsArticle',
      name: 'Events',
      path: '/events',
    },
    {
      icon: 'hugeCalendar03',
      name: 'My events',
      path: '/events/my-events',
    },
    {
      icon: 'hugeBookmark01',
      name: 'Registred events',
      path: '/events/registered-events',
    },
    {
      icon: 'hugeUser',
      name: 'New event',
      path: '/events/new-event',
    },
  ];

}
