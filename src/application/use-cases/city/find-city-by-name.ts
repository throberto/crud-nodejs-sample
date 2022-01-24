import { City } from "../../../domain/entities/City";
import { FindCityByNameUseCase } from "../../../domain/use-cases/city/find-city-by-name";
import { FindCityByNameRepository } from "../../ports/repositories/city/find-city-by-name-repository";

export class FindCityByName implements FindCityByNameUseCase {
  constructor(
    private readonly findCityByNameRepository: FindCityByNameRepository
  ) {}

  async findByName(name: string): Promise<City> {
    const city = await this.findCityByNameRepository.findByName(name);

    if (!city) {
      throw new Error("City not found");
    }

    return city;
  }
}
