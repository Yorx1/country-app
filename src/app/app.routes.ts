import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ByCapitalPageComponent } from './country/pages/by-capital-page/by-capital-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes')
  },
  {
    path: '**',
    redirectTo: ''
  },
];
