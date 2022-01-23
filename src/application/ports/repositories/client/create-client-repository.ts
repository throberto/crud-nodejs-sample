export interface CreateClientRepository {
  create(
    id: number,
    name: string,
    genre: string,
    age: number,
    city: string
  ): Promise<void>;
}
