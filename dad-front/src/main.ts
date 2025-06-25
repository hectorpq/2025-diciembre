// Ruta: dad-front/src/main.ts                 // obligatorio para cambio de detección de Angular
import 'zone.js/dist/zone';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
