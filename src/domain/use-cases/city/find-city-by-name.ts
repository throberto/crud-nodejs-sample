import { City } from "../../entities/City";

export interface FindCityByNameUseCase {
  findByName(name: string): Promise<City>;
}
