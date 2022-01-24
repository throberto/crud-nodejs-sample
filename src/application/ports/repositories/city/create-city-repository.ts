export interface CreateCityRepository {
  create(name: string, state: string): Promise<void>;
}
