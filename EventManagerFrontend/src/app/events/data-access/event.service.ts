import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';  
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  apiUrl = environment.apiUrl
  constructor(private httpClient: HttpClient, private authService: AuthService, private router : Router) { }

  
  getEvents(): Observable<any>{
    var token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });
    return this.httpClient.get(this.apiUrl+"/events", {headers: headers});
  }

  registerEvent(id: number){
    console.log('Registering event:', id);
    var token = this.authService.getToken();
    var api = this.apiUrl+"/eventRegistration/"+id
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });
    console.log(headers)
    return this.httpClient.post(api, {}, {headers: headers}).subscribe(response => {   
      console.log('Inscription réussie', response);    
    }, error => {  
      console.error('Erreur de connexion', error);  
    });  
  }

  getMyEvents(): Observable<any>{
    var token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });
    return this.httpClient.get(this.apiUrl+"/events/creator", {headers: headers});
  }

  deleteEvent(id: number): Observable<any>{
    console.log('Deleting event:', id);
    var token = this.authService.getToken();
    var api = this.apiUrl+"/events/"+id
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });
    console.log(headers)
    return this.httpClient.delete(api, {headers: headers})  
  }

  getRegistredEvents(): Observable<any>{
    var token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });
    return this.httpClient.get(this.apiUrl+"/eventRegistration", {headers: headers});
  }

  unregisterEvent(id: number): Observable<any>{
    console.log('Unregistering event:', id);
    var token = this.authService.getToken();
    var api = this.apiUrl+"/eventRegistration/"+id
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });
    console.log(headers)
    return this.httpClient.delete(api, {headers: headers})  
  }

  createEvent(event : {
    title: string,
    date: Date,
    location: string,
    description: string
  }){
    console.log('Creating event:', event);
    var token = this.authService.getToken();
    var api = this.apiUrl+"/events/create"
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });
    console.log(headers)
    return this.httpClient.post(api, event, {headers: headers}).subscribe(response => {   
      console.log('Event created', response);  
      this.router.navigate(['/events'])  
    }, error => {  
      console.error('Connection error', error);  
    });  
  }
}
