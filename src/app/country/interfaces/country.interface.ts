export interface Country {
    cca2: string
    flag: string,
    flagPng: string,
    name: string,
    capital: string
    population: number,
    latLng: number[]
    area: number
    traslation: { [key: string]: { [key: string]: {} } }
    coatArms: string | undefined
    continents: string[]
    subRegion:string
}