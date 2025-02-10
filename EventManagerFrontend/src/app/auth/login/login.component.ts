import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { hugeGoogle, hugeMicrosoft, hugeMail01, hugeLockPassword, hugeColors } from '@ng-icons/huge-icons';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIconComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers:[AuthService],
  viewProviders: [provideIcons({ hugeGoogle, hugeMicrosoft, hugeMail01, hugeLockPassword, hugeColors })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private authService: AuthService){}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  onSubmit() {  
    if (this.form.valid) {  
      this.authService.login({ email: this.form.get('email')?.value, password: this.form.get('password')?.value });  
    } else {  
      console.error('Formulaire invalide');  
    }  
  }  
}
