import { CreateClientUseCase } from "../../../domain/use-cases/client/create-client-use-case";
import { CreateClientRepository } from "../../ports/repositories/client/create-client-repository";

export class CreateClient implements CreateClientUseCase {
  constructor(
    private readonly createClientRepository: CreateClientRepository
  ) {}

  async create(
    id: number,
    name: string,
    genre: string,
    age: number,
    city: string
  ): Promise<void> {
    this.createClientRepository.create(id, name, genre, age, city);
  }
}
