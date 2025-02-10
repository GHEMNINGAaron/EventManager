import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';   
import { AuthService } from '../../auth/service/auth.service';  
import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (req.method === 'OPTIONS') {
    return next(req);
  }

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
}

