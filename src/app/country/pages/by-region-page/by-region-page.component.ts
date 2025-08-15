import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, firstValueFrom } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";


@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, RouterModule, NotFoundComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  regions: Region[] = [
    'Americas',
    'Africa',
    'Antarctic',
    'Asia',
    'Europe',
    'Oceania',
  ]

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''

  regionValue = signal<Region | null | string>(this.queryParams);

  regionsResource = rxResource({
    params: () => ({ 'query': this.regionValue() }),
    stream: ({ params }) => {
      console.log(this.queryParams);
      if (!params.query) return of([])
      return this.countryService.searchByRegion(params.query)
    }
  })



}
