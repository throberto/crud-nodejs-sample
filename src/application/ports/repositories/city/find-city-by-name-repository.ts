import { City } from "../../../../domain/entities/City";

export interface FindCityByNameRepository {
  findByName(name: string): Promise<City | null>;
}
