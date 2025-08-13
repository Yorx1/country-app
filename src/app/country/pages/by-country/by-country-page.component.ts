import { CountryListComponent } from './../../components/country-list/country-list.component';
import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";;
import { CountryService } from '../../services/country.service';
import { firstValueFrom, map, materialize, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryComponent {

  countryService = inject(CountryService);
  query = signal('')

  countryResources = rxResource({
    params: () => ({ 'query': this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchByCountry(params.query)
    },

  }
  )

}
