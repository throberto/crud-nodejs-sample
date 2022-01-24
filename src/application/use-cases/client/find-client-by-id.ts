import { Client } from "../../../domain/entities/Client";
import { FindClientByIdUseCase } from "../../../domain/use-cases/client/find-client-by-id-use-case";
import { FindClientByIdRepository } from "../../ports/repositories/client/find-client-by-id-repository";

export class FindClientById implements FindClientByIdUseCase {
  constructor(
    private readonly findClientByIdRepository: FindClientByIdRepository
  ) {}

  async findById(id: number): Promise<Client> {
    const client = await this.findClientByIdRepository.findById(id);

    if (!client) {
      throw new Error("Client not found");
    }

    return client;
  }
}
