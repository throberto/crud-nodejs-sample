import { City } from "../../../../domain/entities/City";

export interface FindCityByStateRepository {
  findByState(state: string): Promise<City[]>;
}
