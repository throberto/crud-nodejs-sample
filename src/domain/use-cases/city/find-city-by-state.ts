import { City } from "../../entities/City";

export interface FindCityByStateUseCase {
  findByState(state: string): Promise<City[]>;
}
