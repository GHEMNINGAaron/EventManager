import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EventsComponent } from './events/events-page/events.component';
import { MyEventsComponent } from './events/my-events-page/my-events.component';
import { RegisteredEventsComponent } from './events/registered-events-page/registered-events.component';
import { NewEventComponent } from './events/new-event/new-event.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: SignupComponent,
      }
    ],
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        component: EventsComponent
      },
      {
        path: 'my-events',
        component: MyEventsComponent
      },
      {
        path: 'registered-events',
        component: RegisteredEventsComponent
      },
      {
        path: 'new-event',
        component: NewEventComponent
      }
    ]
  }
];
