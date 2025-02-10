import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl = environment.apiUrl+"/auth";

  constructor(private httpClient: HttpClient, private router : Router) { }

  login(credentials: { email: string; password: string }) {  
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}/login`, credentials).subscribe(response => {   
      localStorage.setItem('authToken', response.token);   
      this.router.navigate(['/']);  
    }, error => {  
      console.error('Erreur de connexion', error);  
    });  
  } 

  register(credentials: { name: string; email: string; password: string }) {
    console.log(this.apiUrl)
    return this.httpClient.post(`${this.apiUrl}/register`, credentials).subscribe(response => {   
      console.log('Inscription réussie', response);  
      this.router.navigate(['/auth/login']);  
    }, error => {  
      console.error('Erreur d\'inscription', error);  
    });  
  }

  logout() {    
    localStorage.removeItem('authToken');  
    this.router.navigate(['/login']);  
  }  

  getToken() {  
    return localStorage.getItem('authToken');  
  }  

  isAuthenticated(): boolean {  
    return !!this.getToken();   
  } 
}
