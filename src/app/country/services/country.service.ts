import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { Country } from '../interfaces/country.interface';

import { countryMapper } from '../mappers/country.mappers';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient)


  controlErrorAndMaps(by: string, query: string): Observable<Country[]> {
    return this.http.get<RESTCountry[]>(`${API_URL}/${by}/${query}`)
      .pipe(
        delay(2000),
        map(restCountries => countryMapper.mapRestCountryToCountryArray(restCountries)),
        catchError((error) => {
          console.log('Error Fetching', error);
          return throwError(() => new Error(`Error not found ${query}`))
        })
      )
  }


  searchByCapital(query: string): Observable<Country[]> {
    return this.controlErrorAndMaps('capital', query)
  }

  searchByCountry(query: string): Observable<Country[]> {
    return this.controlErrorAndMaps('name', query)
  }

  searchByAlphaCode(code: string): Observable<Country | undefined> {
    return this.controlErrorAndMaps('alpha', code).pipe(
      map((values) => values.at(0))
    )
  }

}
