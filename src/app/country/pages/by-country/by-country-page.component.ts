import { CountryListComponent } from './../../components/country-list/country-list.component';
import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";;
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop'
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent, NotFoundComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryComponent {

  countryService = inject(CountryService);
  ativatedRoute = inject(ActivatedRoute)
  router = inject(Router)


  queryParams = this.ativatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = signal(this.queryParams)

  countryResources = rxResource({
    params: () => ({ 'query': this.query() }),
    stream: ({ params }) => {
      console.log(params.query);

      this.router.navigate(['country/by-country'], {
        queryParams: {
          query: params.query
        }
      })

      if (!params.query) return of([]);
      return this.countryService.searchByCountry(params.query)
    },

  }
  )

}
