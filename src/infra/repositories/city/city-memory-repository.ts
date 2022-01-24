import { City } from "../../../domain/entities/City";
import { CreateCityRepository } from "../../../application/ports/repositories/city/create-city-repository";
import { FindCityByNameRepository } from "../../../application/ports/repositories/city/find-city-by-name-repository";
import { FindCityByStateRepository } from "../../../application/ports/repositories/city/find-city-by-state-repository";

export class CityMemoryRepository
  implements
    CreateCityRepository,
    FindCityByNameRepository,
    FindCityByStateRepository
{
  constructor(private readonly cities: City[] = []) {}

  async create(name: string, state: string): Promise<void> {
    const city = new City(name, state);
    this.cities.push(city);
  }

  findByName(name: string): Promise<City | null> {
    const city =
      this.cities.find((city) => {
        return city.name === name;
      }) || null;

    return Promise.resolve(city);
  }

  findByState(state: string): Promise<City[]> {
    return Promise.resolve(
      this.cities.filter((city) => {
        return city.state === state;
      })
    );
  }
}
