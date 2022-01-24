export interface CreateCityUseCase {
  create(name: string, state: string): Promise<void>;
}
