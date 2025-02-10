import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { hugeGoogle, hugeMicrosoft, hugeUser, hugeMail01, hugeLockPassword, hugePasswordValidation, hugeColors } from '@ng-icons/huge-icons';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgIconComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers:[AuthService],
  viewProviders: [provideIcons({ hugeUser, hugeGoogle, hugeMicrosoft, hugeMail01, hugeLockPassword, hugePasswordValidation, hugeColors })],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {

  constructor(private authService: AuthService){}

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required]),
      confirmPassword: new FormControl<string>('', [Validators.required]),
    });
    this.form.get('confirmPassword')?.setValidators([Validators.required, this.passwordMatch() as ValidatorFn]);
  }

  passwordMatch(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value !== this.form.get('password')?.value) {
        return { passwordMatch: true };
      }
      return null;
    };
  }

  onSubmit() {  
    if (this.form.valid) {  
      this.authService.register({ name: this.form.get('name')?.value, email: this.form.get('email')?.value, password: this.form.get('password')?.value });  
    } else {  
      console.error('Formulaire invalide');  
    }  
  }
}
