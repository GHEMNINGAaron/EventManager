
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding  } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { routes } from './app.routes';
  import { authInterceptor } from './shared/auth-interceptor/aut-interceptor.service';
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
} from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),  
  ]
};
