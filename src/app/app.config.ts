import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getSingleSpaExtraProviders } from 'single-spa-angular';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { gcpTokenInterceptor } from './shared/interceptors/gcp-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    getSingleSpaExtraProviders(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([gcpTokenInterceptor])
    )
  ]
};
