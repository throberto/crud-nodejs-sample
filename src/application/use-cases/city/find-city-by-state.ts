import { City } from "../../../domain/entities/City";
import { FindCityByStateUseCase } from "../../../domain/use-cases/city/find-city-by-state";
import { FindCityByStateRepository } from "../../ports/repositories/city/find-city-by-state-repository";

export class FindCityByState implements FindCityByStateUseCase {
  constructor(
    private readonly findCityByStateRepository: FindCityByStateRepository
  ) {}

  async findByState(state: string): Promise<City[]> {
    const cities = await this.findCityByStateRepository.findByState(state);

    if (!cities.length) {
      throw new Error("Cities not found");
    }

    return cities;
  }
}
