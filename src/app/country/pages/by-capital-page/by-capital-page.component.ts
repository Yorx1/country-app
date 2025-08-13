import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  imports: [SearchInputComponent, CountryListComponent]
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  query = signal('');

  countryResources = resource({
    params: () => ({ 'query': this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      )
    },
  })




  /* isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {

    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);
    

    this.countryService.searchByCapital(query).subscribe((countries) => {
      this.isLoading.set(false);
      this.countries.set(countries);
      console.log({countries});
      
    });
  } */
}
