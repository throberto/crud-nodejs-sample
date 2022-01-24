export interface CreateClientUseCase {
  create(
    id: number,
    name: string,
    genre: string,
    age: number,
    city: string
  ): Promise<void>;
}
