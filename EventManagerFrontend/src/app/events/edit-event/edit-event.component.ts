import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { hugeGoogle,  hugeUser, hugeMail01, hugeColors, hugeArrowDown01 } from '@ng-icons/huge-icons';

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
import { EventService } from '../data-access/event.service';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [
    NgIconComponent,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
  ],
  viewProviders: [provideIcons({ hugeArrowDown01 })],
  providers:[EventService, AuthService],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {

  constructor(private eventService: EventService, private authService: AuthService){}

  form!: FormGroup;
  token?: string;
  newEvent ? : boolean = false;
  event!: any;

  ngOnInit(): void {
    this.getEditedEvent()
    console.log(this.event)
    this.form = new FormGroup({
      title: new FormControl<string>('', [Validators.required]),
      date: new FormControl<Date | null>(null,  [Validators.required, this.futureDateValidator]),
      location: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>('', [Validators.required]),
    });
    this.token = this.authService.getToken() || '';
    this.newEvent = (this.token !== '') ? true : false;
  }

  getEditedEvent(): void{
    var temp = localStorage.getItem('editedEvent')

    if(temp){
      this.event = JSON.parse(temp)
    }
  }

  futureDateValidator(control: FormControl): { [key: string]: boolean } | null {
    if (control.value && new Date(control.value) < new Date()) {
      return { pastDate: true };
    }
    return null;
  }

  editEvent(){
    if (this.form.valid) {  
      this.eventService.editEvent(this.event.id,
        { title: this.form.get('title')?.value, 
          date: this.form.get('date')?.value, 
          location: this.form.get('location')?.value,
          description: this.form.get('description')?.value});  
    } else {  
      console.error('Formulaire invalide');  
    }  
    localStorage.removeItem('editedEvent')
  }

}
