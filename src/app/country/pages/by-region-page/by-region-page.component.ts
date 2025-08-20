import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";


function validateQueryParam(queryParams: string): Region {
  queryParams = queryParams.toLowerCase()
  const validRegions: Record<string, Region> = {
    'americas': 'Americas',
    'africa': 'Africa',
    'antarctic': 'Antarctic',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
  }

  return validRegions[queryParams] ?? 'Americas'
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, RouterModule, NotFoundComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  regions: Region[] = [
    'Americas',
    'Africa',
    'Antarctic',
    'Asia',
    'Europe',
    'Oceania',
  ]

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''

  regionValue = signal<Region>(validateQueryParam(this.queryParams));

  regionsResource = rxResource({
    params: () => ({ 'query': this.regionValue() }),
    stream: ({ params }) => {
      console.log(this.queryParams);
      if (!params.query) return of([])
      this.router.navigate(['country/by-region'], {
        queryParams: {
          query: params.query
        }
      })
      return this.countryService.searchByRegion(params.query)
    }
  })



}
