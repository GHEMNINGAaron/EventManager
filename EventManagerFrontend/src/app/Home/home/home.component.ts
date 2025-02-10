import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { hugeColors, hugeUser, hugeCheckmarkCircle01, hugeShieldEnergy, hugeHappy } from '@ng-icons/huge-icons';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent, RouterModule, NavbarComponent],
  viewProviders: [provideIcons({ hugeUser, hugeColors, hugeCheckmarkCircle01, hugeShieldEnergy, hugeHappy })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  values = [
    {
      icon: 'hugeUser',
      description: '+10 users',
      nextDescription: 'satisfied',
    },
    {
      icon: 'hugeCheckmarkCircle01',
      description: '+10 events',
      nextDescription: 'vérified',
    },
    {
      icon: 'hugeShieldEnergy',
      description: '+10 partners',
      nextDescription: 'secured',
    },
    {
      icon: 'hugeHappy',
      description: 'Many',
      nextDescription: 'good moments',
    },
  ];
  images = [
    {
      path: 'assets/welcome.jpeg',
      name: 'Pl. W. Churchil',
    },
    {
      path: 'assets/welcome.jpeg',
      name: 'Pl. Carnot',
    },
    {
      path: 'assets/welcome.jpeg',
      name: 'Mairie',
    },
    {
      path: 'assets/welcome.jpeg',
      name: 'Opéra',
    },
    {
      path: 'assets/welcome.jpeg',
      name: 'Mal Juin',
    },
    {
      path: 'assets/welcome.jpeg',
      name: 'Av. Ernest Rubert',
    },
    {
      path: 'assets/welcome.jpeg',
      name: 'Rue F. Perrin',
    },
    {
      path: 'assets/welcome.jpeg',
      name: 'Rue. A. Camut',
    },
  ];
}
