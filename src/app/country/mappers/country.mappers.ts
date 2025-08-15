import { Country } from '../interfaces/country.interface';
import { RESTCountry } from './../interfaces/rest-country.interface';

export class countryMapper {

    static mapRestCountryToCountry(restCountry: RESTCountry): Country {
        return {
            capital: restCountry.capital?.join(',') ?? restCountry.capital, 
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagPng: restCountry.flags.png,
            name: restCountry.translations['spa']['official'] ?? restCountry.name,
            population: restCountry.population,
            latLng: restCountry.capitalInfo.latlng,
            area: restCountry.area,
            traslation: restCountry.translations as {},
            coatArms: restCountry.coatOfArms.png,
            continents: restCountry.continents,
            subRegion: restCountry.subregion
        }
    }

    static mapRestCountryToCountryArray = (restCountry: RESTCountry[]): Country[] => {
        return restCountry.map(countryMapper.mapRestCountryToCountry)
    }

}