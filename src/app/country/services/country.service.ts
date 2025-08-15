import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { Country } from '../interfaces/country.interface';

import { countryMapper } from '../mappers/country.mappers';

const API_URL = 'https://restcountries.com/v3.1'


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCache = new Map<string, Country[]>();
  private regionCache = new Map<string, Region>();

  controlErrorAndMaps(saveCache: Map<string, Country[] | Region>, by: string, query: string): Observable<Country[]> {
    query = query.toLowerCase()

    if (saveCache.has(query)) {
      console.log(saveCache);
      return of(saveCache.get(query) ?? []) as Observable<Country[]>
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/${by}/${query}`)
      .pipe(
        /*delay(2000),*/
        map(restCountries => countryMapper.mapRestCountryToCountryArray(restCountries)),
        tap(countries => saveCache.set(query, countries)),
        catchError((error) => {
          console.log('Error Fetching', error);
          return throwError(() => new Error(`Error not found ${query}`))
        })
      )
  }


  searchByCapital(query: string): Observable<Country[]> {
    return this.controlErrorAndMaps(this.queryCache, 'capital', query)
  }

  searchByCountry(query: string): Observable<Country[]> {
    return this.controlErrorAndMaps(this.queryCache, 'name', query)
  }

  searchByAlphaCode(code: string): Observable<Country | undefined> {
    return this.controlErrorAndMaps(this.queryCache, 'alpha', code).pipe(
      map((values) => values.at(0))
    )
  }

  searchByRegion(region: string): Observable<Country[]> {
    return this.controlErrorAndMaps(this.regionCache, 'region', region)
  }

}
