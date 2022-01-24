import { Client } from "../../../domain/entities/Client";
import { FindClientByNameUseCase } from "../../../domain/use-cases/client/find-client-by-name-use-case";
import { FindClientByNameRepository } from "../../ports/repositories/client/find-client-by-name-repository";

export class FindClientByName implements FindClientByNameUseCase {
  constructor(
    private readonly findClientByNameRepository: FindClientByNameRepository
  ) {}

  async findByName(name: string): Promise<Client> {
    const client = await this.findClientByNameRepository.findByName(name);

    if (!client) {
      throw new Error("Client not found");
    }

    return client;
  }
}
